import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import FormRegisteringVoters from "./FormRegisteringVoters";
import ProposalsRegistrationEnded from "./ProposalsRegistrationEnded";
import ProposalsRegistrationStarted from "./ProposalsRegistrationStarted";
import VotesTallied from "./VotesTallied";
import VotingSessionEnded from "./VotingSessionEnded";
import VotingSessionStarted from "./VotingSessionStarted";

function Body({ statusWorkflowNb, setstatusWorkflowNb, userStatus, voterAdresses, setVoterAdresses }) {
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
        2: 'Fin de l\'enregistrement',
        3: 'Début des votes',
        4: 'Fin des votes',
        5: 'Nous avons un vainqueur !'
    }

    const goNextstatusWorkflowNb = async () => {
        try {
            const nextStep = parseInt(statusWorkflowNb) + 1;
            const transac = await contract.methods[workflowStatus[nextStep]]().send({ from: accounts[0] });
            // console.log("transac = " + transac)
            //USELESS ?
            console.log('return')
            console.log(await transac.events.WorkflowStatusChange)
            const newstatusWorkflowNb = await transac.events.WorkflowStatusChange.returnValues.newStatus;
            console.log("[goNextstatusWorkflowNb] - newstatusWorkflowNb = " + newstatusWorkflowNb)
            setstatusWorkflowNb(newstatusWorkflowNb)
        } catch (error) {
        }
    }
    // const getCurrentStep = async () => {


    useEffect(() => {
        //   try {
        //     await contract.methods.workflowStatus().call({ from: accounts[0] }).then(
        //       (curStep) => {
        //         setstatusWorkflowNb(curStep);
        //       }
        //     );
        //   } catch (error) {
        //   }
        // }
        // getCurrentStep();

        // console.log(workflowStatus[statusWorkflowNb])
        // if (workflowStatus[statusWorkflowNb] === 'RegisteringVoters') console.log('yes')
        // else console.log('no')
        console.log(statusWorkflowNb)
        console.log(workflowStatus[statusWorkflowNb])
        switch (workflowStatus[statusWorkflowNb]) {
            case 'RegisteringVoters':
                setRenderStep(<FormRegisteringVoters contract={contract} accounts={accounts} userStatus={userStatus} voterAdresses={voterAdresses} setVoterAdresses={setVoterAdresses} />);
                break;
            case 'startProposalsRegistering':
                setRenderStep(<ProposalsRegistrationStarted />);
                break;
            case 'endProposalsRegistering':
                setRenderStep(<ProposalsRegistrationEnded />);
                break;
            case 'startVotingSession':
                setRenderStep(<VotingSessionStarted />);
                break;
            case 'endVotingSession':
                setRenderStep(<VotingSessionEnded />);
                break;
            case 'tallyVotes':
                setRenderStep(<VotesTallied />);
                break;
            default:
                setRenderStep(<div>Oops il semblerait que cette étape soit inconnue.</div>);
                break;
        }
    }, [statusWorkflowNb, accounts, contract, userStatus, voterAdresses]);
    return (
        <main style={{ backgroundColor: '#15192C', height: '90vh' }} className=" w-full">
            {userStatus === 'nonVoter' ? (
                <div className="bg-black">Désolé mais vous n'avez pas accès au vote</div>
            ) : (
            <div className="w-full">
                <div className="text-5xl mb-16 text-center pt-6" >{workflowStatusTraduction[statusWorkflowNb]}</div>
                {renderStep}
                {userStatus === 'owner' ?
                <button className=" text-2xl bg-green-600 py-6 px-16 rounded-xl cursor-pointer absolute right-8 bottom-8 " type="button" onClick={() => goNextstatusWorkflowNb(statusWorkflowNb)}>Next Step</button> : <></>}
            </div>
            )}

        </main >
    );
}

export default Body;
