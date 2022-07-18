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
        <main style={{ backgroundColor: '#232327' }} className=" w-full px-16 py-10 h-screen">
            <div style={{ left: '50%', top: '50%', transform: 'translate(-50, -50)' }} className="absolute">
                {renderStep}
                {userStatus === 'owner' ?
                    <button className="border cursor-pointer" type="button" onClick={() => goNextstatusWorkflowNb(statusWorkflowNb)}>Next Step</button> : <></>}
            </div>
        </main >
    );
}

export default Body;
