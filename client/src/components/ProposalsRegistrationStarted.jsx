import { useState } from "react";

function ProposalsRegistrationStarted({ contract, accounts, userStatus, proposals, setProposals, voterAdresses }) {
    const [proposal, setProposal] = useState('');

    const registerProposal = async () => {
        if (userStatus === 'voter') {
            try {
                await contract.methods.addProposal(proposal).send({ from: accounts[0] });
                setProposals([...proposals, proposal])
                setProposal('');
            } catch (error) {
                console.error(error.message);
            }
        }
    }



    return (
        <div className="pt-6">
            {userStatus === 'voter' ? (
                <div className="w-full text-center">
                    <div className="mb-4">
                        <input type="text" className="bg-transparent border border-purple-400 p-4 rounded-xl w-1/5" placeholder="Entrez votre proposition" value={proposal} onChange={(e) => setProposal(e.target.value)} />
                        <div>
                            <button className="bg-purple-400 px-4 py-3 rounded-xl w-1/5 mt-3 hover:bg-purple-600" type="submit" onClick={() => registerProposal()}>Enregistrer</button>
                        </div>
                    </div>
                    <div>Liste des propositions:</div>
                    <div className="w-full text-center">
                        {proposals.map(proposal => <div key={proposal}>{proposal}</div>)}
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-full text-center">
                        <div>Liste des électeurs enregistrés:</div>
                        <div>
                            {voterAdresses.map(voterAdress => <div key={voterAdress}>{voterAdress}</div>)}
                        </div>
                    </div>
                    <div>
                        <div className="text-center">Liste des propositions:</div>
                        <div className="w-full text-center">
                            {proposals.map(proposal => <div key={proposal}>{proposal}</div>)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProposalsRegistrationStarted;
