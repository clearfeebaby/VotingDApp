import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import FormRegisteringVoters from "./FormRegisteringVoters";
import ProposalsRegistrationEnded from "./ProposalsRegistrationEnded";
import ProposalsRegistrationStarted from "./ProposalsRegistrationStarted";
import VotesTallied from "./VotesTallied";
import VotingSessionEnded from "./VotingSessionEnded";
import VotingSessionStarted from "./VotingSessionStarted";
import arrowButton from '../assets/img/arrowButton.svg';

function Body({ statusWorkflowNb, setstatusWorkflowNb, userStatus, voterAdresses, setVoterAdresses, proposals, setProposals }) {
    const [renderStep, setRenderStep] = useState(<></>);
    const { state: { contract, accounts } } = useEth();
    const workflowStatus = {
        0: 'RegisteringVoters',
        1: 'startProposalsRegistering',
        2: 'endProposalsRegistering',
        3: 'startVotingSession',
        4: 'endVotingSession',
        5: 'tallyVotes'
    }

    const workflowStatusTraduction = {
        0: 'Début de l\'enregistrement des participants',
        1: 'Début de l\'enregistrement des propositions',
        2: 'Fin de l\'enregistrement des propositions',
        3: 'Début des votes',
        4: 'Fin des votes',
        5: 'Nous avons un vainqueur !'
    }

    const goNextstatusWorkflowNb = async () => {
        try {
            const nextStep = parseInt(statusWorkflowNb) + 1;
            const transac = await contract.methods[workflowStatus[nextStep]]().send({ from: accounts[0] });
            const newstatusWorkflowNb = await transac.events.WorkflowStatusChange.returnValues.newStatus;
            setstatusWorkflowNb(newstatusWorkflowNb)
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        switch (workflowStatus[statusWorkflowNb]) {
            case 'RegisteringVoters':
                setRenderStep(<FormRegisteringVoters contract={contract} accounts={accounts} userStatus={userStatus} voterAdresses={voterAdresses} setVoterAdresses={setVoterAdresses} />);
                break;
            case 'startProposalsRegistering':
                setRenderStep(<ProposalsRegistrationStarted contract={contract} accounts={accounts} userStatus={userStatus} proposals={proposals} setProposals={setProposals} voterAdresses={voterAdresses} />);
                break;
            case 'endProposalsRegistering':
                setRenderStep(<ProposalsRegistrationEnded proposals={proposals} voterAdresses={voterAdresses} userStatus={userStatus} />);
                break;
            case 'startVotingSession':
                setRenderStep(<VotingSessionStarted contract={contract} accounts={accounts} proposals={proposals} userStatus={userStatus} />);
                break;
            case 'endVotingSession':
                setRenderStep(<VotingSessionEnded contract={contract} accounts={accounts} voterAdresses={voterAdresses} proposals={proposals} userStatus={userStatus} />);
                break;
            case 'tallyVotes':
                setRenderStep(<VotesTallied contract={contract} accounts={accounts} proposals={proposals} />);
                break;
            default:
                setRenderStep(<div>Oops il semblerait que cette étape soit inconnue.</div>);
                break;
        }
    }, [statusWorkflowNb, accounts, contract, userStatus, voterAdresses, proposals]);
    return (
        <main className="w-full">
            {userStatus === 'nonVoter' ? (
                <div className="bg-black">Désolé mais vous n'avez pas accès au vote</div>
            ) : (
                <div className="w-full">
                    <div className="text-5xl mb-16 text-center pt-6" >{workflowStatusTraduction[statusWorkflowNb]}</div>
                    {renderStep}
                    {userStatus === 'owner' && workflowStatus[statusWorkflowNb] !== 'tallyVotes' ?
                    <button className="text-2xl bg-green-600 hover:bg-green-500 py-6 px-16 rounded-xl cursor-pointer absolute right-10 bottom-20 " type="button" onClick={() => goNextstatusWorkflowNb(statusWorkflowNb)}>
                        <div className="flex w-full justify-between items-center">
                            <p className="mr-6">Next Step</p>
                            <img src={arrowButton} alt="next" />
                        </div>
                    </button> : <></>}
                </div>
            )}

        </main >
    );
}

export default Body;
