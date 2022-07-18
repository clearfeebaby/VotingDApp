import { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import useEth from "../contexts/EthContext/useEth";

function Main() {
    const { state: { contract, accounts } } = useEth();
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
                // console.log('[getOwner] - OwnerAddress | ' + ownerAddress)
                // console.log('[getOwner] - owner | ' + owner)
            } catch (error) {
            }
        }

        const getstatusWorkflowNb = async () => {
            try {
                console.log('getstatusWorkflowNbcalled')
                setstatusWorkflowNb(await contract.methods.workflowStatus().call({ from: accounts[0] }))
            } catch (error) {
            }
        }

        const getVotersAdresses = async () => {
            console.log('getVoterAddr')

            let options = {
                fromBlock: '0',
                to: 'latest'
            };
            const events = await contract.getPastEvents('VoterRegistered', options)
            const voterAdressesArr = await events.map(event => event.returnValues.voterAddress)
            setVoterAdresses(voterAdressesArr)
            // console.log('[getVotersAdresses] - voterAdresses | ');
            // console.log(voterAdresses);
        };

        const getProposals = async () => {
            // console.log('getProposals')

            let options = {
                fromBlock: '0',
                to: 'latest'
            };
            try {
                const listProposals = await contract.getPastEvents('ProposalRegistered', options).then(
                    async (r) => {
                        // console.log("r = ", r)
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
                console.log(error);
            }
        };

        const getUserStatus = async () => {
            if (owner) return setUserStatus('owner')
            voterAdresses.indexOf(accounts[0]) !== -1 ? setUserStatus('voter') : setUserStatus('nonVoter')
            // console.log('[getVotersAdresses] - voterAdresses | ');
            // console.log(voterAdresses);
            // console.log('[getUserStatus] - userStatus | ' + userStatus)
        }

        // const testStatus = await contract.methods.getWorkFlowStatus
        if (contract) {
            getOwner();
            getstatusWorkflowNb();
            getVotersAdresses();
            // if (voterAdresses.length > 0) getUserStatus()
            getUserStatus();
            getProposals();
        }
    }, [statusWorkflowNb, owner, accounts, contract]);
    // [statusWorkflowNb, accounts, contract, owner, voterAdresses]

    return (
        <>
            <Header statusWorkflowNb={statusWorkflowNb} userStatus={userStatus} />
            {userStatus === 'nonVoter' ? <div className="bg-black">Désolé mais vous n'avez pas accès au vote</div> : <Body statusWorkflowNb={statusWorkflowNb} setstatusWorkflowNb={setstatusWorkflowNb} userStatus={userStatus} voterAdresses={voterAdresses} setVoterAdresses={setVoterAdresses} proposals={proposals} setProposals={setProposals} />}
            <Footer />
        </>
    );
}

export default Main;
