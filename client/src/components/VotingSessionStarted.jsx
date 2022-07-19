import { useEffect, useState } from "react";

function VotingSessionStarted({ contract, accounts, proposals, userStatus }) {

    const [hasVoted, setHasVoted] = useState(false);
    const [votedProposalId, setVotedProposalId] = useState(-1);
    // const [proposalsVotedNb, setProposalsVotedNb] = useState([])

    const getVoter = async () => {
        const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
        setHasVoted(voter.hasVoted);
        setVotedProposalId(voter.votedProposalId);
    }

    // const countProposalsVote = async () => {
    //     console.log('proposals')
    //     console.log(proposals)
    //     console.log(userStatus)
    //     if (userStatus !== 'owner') {
    //         let tmp = []
    //         for (let i = 0; i < proposals.length; i++) {
    //             const proposalInfos = await contract.methods.getOneProposal(i).call({ from: accounts[0] })
    //             tmp = [...tmp, proposalInfos.voteCount]
    //             // console.log("proposal info", proposalInfos)
    //         }
    //         setProposalsVotedNb(tmp)
    //         // setProposalsVotedNb(toto)
    //     }
    // }

    const addVote = async (id) => {
        try {
            const transac = await contract.methods.setVote(id).send({ from: accounts[0] });
            const eventChange = await transac.events.Voted.returnValues.proposalId;
            getVoter()
        } catch (error) {
            console.error(error.message);
        }
    };

    // useEffect(() => {
    //     countProposalsVote();
    // }, [proposals, accounts])

    // console.log(proposalsVotedNb)

    useEffect(() => {
        getVoter();
    }, [accounts])

    // console.log(hasVoted)
    // console.log(proposalsVotedNb)

    // getVoter();
    return (
        <>

            {userStatus === 'owner' ?
                <div><div className="w-full text-center">
                    <div>Liste des propositions enregistrés:</div>
                    <div>
                        {proposals.map((proposal, index) => <div key={index}>{proposal}</div>)}
                    </div>
                </div></div>
                : !hasVoted ?
                    <div className="w-full text-center">
                        <div>Liste des propositions enregistrés. Vous pouvez en choisir une en cliquant sur l'icone.</div>
                        <div>
                            {proposals.map((proposal, index) => <div key={index}>{proposal}<button onClick={() => addVote(index)}>🗳️</button></div>)}
                        </div>
                    </div>
                    :
                    <div className="w-full text-center">
                        <div>Liste des propositions enregistrés. Merci pour votre vote.</div>
                        <div>
                            {proposals.map((proposal, index) => <div key={index} className={`${index === parseInt(votedProposalId) ? "text-blue-500" : ""}`}>{proposal}</div>)}
                        </div>
                    </div>
            }
        </>
    );
}

export default VotingSessionStarted;
