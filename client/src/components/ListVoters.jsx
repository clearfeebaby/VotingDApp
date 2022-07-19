
function ListVoters({ voterAdresses }) {
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
                            Liste des électeurs enregistrés
                        </div>
                        <div  className="w-full text-center">
                            {voterAdresses.map((voterAdress, index) => {
                                return (
                                    <div style={{ backgroundColor: backgroundRowArray(index) }} key={voterAdress}>
                                        {voterAdress}
                                    </div>
                                )
                            } )}
                        </div>
                    </div>
                    </div>
    );
}

export default ListVoters;