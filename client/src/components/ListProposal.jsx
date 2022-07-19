
function ListProposal({ proposals }) {
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
        <div className="w-full text-center">
            <div  className="mt-16 w-1/2 m-auto rounded-t-3xl overflow-hidden">
                <div style={{ backgroundColor: '#5D6AD2'}}  className="text-2xl py-6">
                    Liste des propositions
                </div>
                <div  className="w-full text-center">
                    {proposals.map((proposal, index) => {
                        return (
                            <div style={{ backgroundColor: backgroundRowArray(index) }} key={proposal}>
                                {proposal}
                            </div>
                        )
                    } )}
                </div>
            </div>
        </div>
    );
}

export default ListProposal;