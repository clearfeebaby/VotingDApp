import { useState, useEffect } from "react";

function FormRegisteringVoters({ contract, accounts, userStatus, voterAdresses, setVoterAdresses }) {
    const [voterWallet, setVoterWallet] = useState('');


    const registerVoter = async () => {
        try {
            console.log(voterWallet)
            const transac = await contract.methods.addVoter(voterWallet).send({ from: accounts[0] });
            // const addedVoter = await transac.events.VoterRegistered.returnValues.voterAddress;
            setVoterAdresses([...voterAdresses, voterWallet])
            // setVoterWallet('');
            console.log(`[registerVoter] - Le voter ${voterWallet} a ete ajoute`)
        } catch (error) {
            console.error(error.message);
        }
    }
    // console.log('userStatus ?' + userStatus)
    //remplacer par form ?

    return (
        <div>
            {userStatus === 'owner' ? <div className=" w-full text-center">
                <table>
                    <thead>
                        <tr>
                            <th>Liste des électeurs enregistré:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {voterAdresses.map(voterAdress => <td key={voterAdress}>${voterAdress}</td>)}
                        </tr>
                    </tbody>
                </table>
                <div className="mb-4">
                    <input className="bg-black p-4 rounded-xl" type="text" value={voterWallet} onChange={(e) => setVoterWallet(e.target.value)} />
                    <button className="bg-purple-400 p-4 rounded-xl" type="submit" onClick={() => registerVoter()}>Register</button>
                </div>
            </div> : <div>Vous êtes correctement enregistré. En attente de l'ouverture des propositions</div>}
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