import { useState } from "react";
import ListProposal from "./ListProposal";
import ListVoters from "./ListVoters";

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
                        <input type="text" className="bg-transparent border border-purple-400 p-4 rounded-xl w-2/6" placeholder="Saisir votre proposition" value={proposal} onChange={(e) => setProposal(e.target.value)} />
                        <div>
                            <button className="bg-purple-400 text-2xl px-4 py-3 rounded-xl w-2/6 mt-3 hover:bg-purple-600" type="submit" onClick={() => registerProposal()}>Enregistrer</button>
                        </div>
                    </div>
                    <ListProposal proposals={proposals}/>
                </div>
            ) : (
                <>
                    <ListVoters voterAdresses={voterAdresses} />
                    <ListProposal proposals={proposals}/>
                </>
            )}
        </div>
    );
}

export default ProposalsRegistrationStarted;
