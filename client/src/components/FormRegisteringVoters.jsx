import { useState } from "react";
import celebration from '../assets/img/celebration.svg'
import ListVoters from "./ListVoters";


function FormRegisteringVoters({ contract, accounts, userStatus, voterAdresses, setVoterAdresses }) {
    const [voterWallet, setVoterWallet] = useState('');

  const backgroundRowArray = (rowNumber) => {
    let backgroundColor = '';
    if (rowNumber % 2 === 0) {
      backgroundColor = '#343963';
    } else {
      backgroundColor = '#26293E';
    }
    return backgroundColor;
  };
    const registerVoter = async () => {
        try {
            await contract.methods.addVoter(voterWallet).send({ from: accounts[0] });
            setVoterAdresses([...voterAdresses, voterWallet])
            setVoterWallet('');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="pt-6">
            {userStatus === 'owner' ? (
                <div className="w-full text-center">
                    <div className="mb-4">
                        <input type="text" className="bg-transparent border border-purple-400 p-4 rounded-xl w-1/5" placeholder="Saisir le wallet" value={voterWallet} onChange={(e) => setVoterWallet(e.target.value)} />
                        <div>
                            <button className="bg-purple-400 text-2xl px-4 py-3 rounded-xl w-1/5 mt-3 hover:bg-purple-600" type="submit" onClick={() => registerVoter()}>Enregistrer</button>
                        </div>
                    </div>
                    <ListVoters voterAdresses={voterAdresses} />
                </div>
            ) : (
                <div className="text-3xl text-center">
                    Vous êtes correctement enregistré. En attente de l'ouverture des propositions
                    <img className="m-auto w-1/4 mt-16" src={celebration} alt="correctement enregistré" />
                </div>
            )}
        </div>
    );
}

export default FormRegisteringVoters;