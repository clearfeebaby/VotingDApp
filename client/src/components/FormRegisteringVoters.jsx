import { useState } from "react";

function FormRegisteringVoters({ contract, accounts, userStatus, voterAdresses, setVoterAdresses }) {
    const [voterWallet, setVoterWallet] = useState('');


    const registerVoter = async () => {
        try {
            // console.log(voterWallet)
            const transac = await contract.methods.addVoter(voterWallet).send({ from: accounts[0] });
            // const addedVoter = await transac.events.VoterRegistered.returnValues.voterAddress;
            setVoterAdresses([...voterAdresses, voterWallet])
            setVoterWallet('');
            // console.log(`[registerVoter] - Le voter ${voterWallet} a ete ajoute`)
        } catch (error) {
            console.error(error.message);
        }
    }
    // console.log('contract.userStatus ?' + contract.userStatus)
    //remplacer par form ?

    console.log(contract)
    return (
        <div className="pt-6">
            {userStatus === 'owner' ? (
                <div className="w-full text-center">
                    <div className="mb-4">
                        <input type="text" className="bg-transparent border border-purple-400 p-4 rounded-xl w-1/5" placeholder="Saisir le wallet" value={voterWallet} onChange={(e) => setVoterWallet(e.target.value)} />
                        <div>
                            <button className="bg-purple-400 px-4 py-3 rounded-xl w-1/5 mt-3 hover:bg-purple-600" type="submit" onClick={() => registerVoter()}>Enregistrer</button>
                        </div>
                    </div>
                    <div>Liste des électeurs enregistré:</div>
                    <div className="w-full text-center">
                        {voterAdresses.map(voterAdress => <div key={voterAdress}>{voterAdress}</div>)}
                    </div>
                </div>
            ) : (
                <div>
                    Vous êtes correctement enregistré. En attente de l'ouverture des propositions
                </div>
            )}
        </div>
    );
}

export default FormRegisteringVoters;


// function FormRegisteringVoters() {
//   return (
//     <footer>
//       <div className=" w-full text-center"> FormRegisteringVoters</div>
//     </footer >
//   );
// }

// export default FormRegisteringVoters;