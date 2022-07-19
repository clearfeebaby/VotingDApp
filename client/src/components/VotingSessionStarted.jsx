import { useEffect, useState } from "react";
import ListProposal from "./ListProposal";
import thanks from '../assets/img/thanks.svg'

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

    const backgroundRowArray = (rowNumber) => {
    let backgroundColor = '';
    if (rowNumber % 2 === 0) {
      backgroundColor = '#343963';
    } else {
      backgroundColor = '#26293E';
    }
    return backgroundColor;
  };

    useEffect(() => {
        getVoter();
    }, [accounts])

    return (
        <>

            {userStatus === 'owner' ?
                <ListProposal proposals={proposals} />
                : !hasVoted ?
                <div className="w-full text-center">
                    <div  className="mt-16 w-1/2 m-auto rounded-t-3xl overflow-hidden">
                        <div style={{ backgroundColor: '#5D6AD2'}}  className="text-2xl py-6">
                            Liste des propositions enregistrés. Vous pouvez en choisir une en cliquant sur l'icone.
                        </div>
                        <div  className="w-full text-center">
                            {proposals.map((proposal, index) => {
                                return (
                                    <div className="flex justify-between items-center px-8 py-3" style={{ backgroundColor: backgroundRowArray(index) }} key={proposals}>
                                       <p>{proposal}</p>
                                        <button onClick={() => addVote(index)}>👍</button>
                                    </div>
                                )
                            } )}
                        </div>
                    </div>
                </div>
        :
                <div className="w-full text-center">
                    <div  className="mt-16 w-1/2 m-auto rounded-t-3xl overflow-hidden">
                        <div style={{ backgroundColor: '#5D6AD2'}}  className="text-2xl py-6">
                            Liste des propositions enregistrés. Merci pour votre vote.
                        </div>
                        <div  className="w-full text-center">
                            {proposals.map((proposal, index) => {
                                return (
                                    <div className=" px-8 py-3" style={{ backgroundColor: backgroundRowArray(index) }} key={proposal}>
                                       <div key={index} className={`${index === parseInt(votedProposalId) ? "text-blue-500" : ""}`}>{proposal}</div>
                                    </div>
                                )
                            } )}
                        </div>
                    </div>
                    <img className="w-2/4 mt-16 m-auto" src={thanks} alt="merci pour votre vote" />
                </div>
            }
        </>
    );
}

export default VotingSessionStarted;
