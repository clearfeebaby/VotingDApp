import { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import useEth from "../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Main() {
    const { state: { contract, accounts } } = useEth();
    const { state } = useEth();
    const [statusWorkflowNb, setstatusWorkflowNb] = useState(0);
    const [userStatus, setUserStatus] = useState('');
    const [owner, setOwner] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [voterAdresses, setVoterAdresses] = useState([]);

    useEffect(() => {
        const getOwner = async () => {
            try {
                const ownerAddress = await contract.methods.owner().call({ from: accounts[0] });
                accounts[0] === ownerAddress ? setOwner(true) : setOwner(false)
            } catch (error) {
                console.error(error.message);
            }
        }

        const getstatusWorkflowNb = async () => {
            try {
                setstatusWorkflowNb(await contract.methods.workflowStatus().call({ from: accounts[0] }))
            } catch (error) {
                console.error(error.message);
            }
        }

        const getVotersAdresses = async () => {
            let options = {
                fromBlock: '0',
                to: 'latest'
            };
            const events = await contract.getPastEvents('VoterRegistered', options)
            const voterAdressesArr = await events.map(event => event.returnValues.voterAddress)
            setVoterAdresses(voterAdressesArr)
        };

        const getProposals = async () => {

            let options = {
                fromBlock: '0',
                to: 'latest'
            };
            try {
                await contract.getPastEvents('ProposalRegistered', options).then(
                    async (r) => {
                        let toArray = [];
                        for (const k in r) {
                            let id = r[k].returnValues[0];
                            await contract.methods.getOneProposal(id).call({ from: accounts[0] }).then((r) => {
                                toArray.push(r.description);
                            });
                        }
                        setProposals(toArray);
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };

        const getUserStatus = async () => {
            if (owner) return setUserStatus('owner')
            voterAdresses.indexOf(accounts[0]) !== -1 ? setUserStatus('voter') : setUserStatus('nonVoter')
        }

        if (contract) {
            getOwner();
            getstatusWorkflowNb();
            getVotersAdresses();
            getUserStatus();
            getProposals();
        }
    }, [statusWorkflowNb, owner, accounts, contract]);

    return (
        <div className="text-xl bg-black h-screen" >
            <Header statusWorkflowNb={statusWorkflowNb} userStatus={userStatus} />
            <>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            userStatus === 'nonVoter' ? <div className="bg-black">Désolé mais vous n'avez pas accès au vote</div> : <Body statusWorkflowNb={statusWorkflowNb} setstatusWorkflowNb={setstatusWorkflowNb} userStatus={userStatus} voterAdresses={voterAdresses} setVoterAdresses={setVoterAdresses} proposals={proposals} setProposals={setProposals} />

                }
            </>
            <Footer />
        </div>
    );
}

export default Main;
