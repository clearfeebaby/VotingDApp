import { useEffect, useState } from "react";

function VotingSessionStarted({ contract, accounts, proposals, userStatus }) {

    const [hasVoted, setHasVoted] = useState(false);
    const [votedProposalId, setVotedProposalId] = useState(-1);

    const getVoter = async () => {
        if (userStatus === 'voter') {
            const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
            setHasVoted(voter.hasVoted);
            setVotedProposalId(voter.votedProposalId);
        }
    }

    const addVote = async (id) => {
        if (userStatus === 'voter') {
            try {
                await contract.methods.setVote(id).send({ from: accounts[0] });
                getVoter()
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    useEffect(() => {
        getVoter();
    }, [accounts])

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
