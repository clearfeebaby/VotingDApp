import ListVoters from "./ListVoters";

function VotingSessionEnded({ contract, accounts, voterAdresses, userStatus, proposals }) {
const backgroundRowArray = (rowNumber) => {
    let backgroundColor = '';
    if (rowNumber % 2 === 0) {
      backgroundColor = '#343963';
    } else {
      backgroundColor = '#26293E';
    }
    return backgroundColor;
  };
    return (
        <>
            {userStatus === 'owner' && <ListVoters voterAdresses={voterAdresses}/>}
            <div className="w-full text-center">
                    <div  className="mt-16 w-1/2 m-auto rounded-t-3xl overflow-hidden">
                        <div style={{ backgroundColor: '#5D6AD2'}}  className="text-2xl py-6">
                            Liste des propositions enregistrés.
                        </div>
                        <div  className="w-full text-center">
                            {proposals.map((proposal, index) => {
                                return (
                                    <div className=" px-8 py-3" style={{ backgroundColor: backgroundRowArray(index) }} key={proposal}>
                                       <div key={index} >{proposal}</div>
                                    </div>
                                )
                            } )}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default VotingSessionEnded;
