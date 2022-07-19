import ListProposal from "./ListProposal";
import ListVoters from "./ListVoters";
import completed from '../assets/img/completed.svg'

function ProposalsRegistrationEnded({ proposals, voterAdresses, userStatus }) {
    console.log(proposals)
    return (
        <>
            <img className="w-2/12 m-auto" src={completed} alt="fin des propositions" />
            {userStatus === 'owner' && <ListVoters voterAdresses={voterAdresses}/>}
            <ListProposal proposals={proposals}/>
        </>
    );
}

export default ProposalsRegistrationEnded;
