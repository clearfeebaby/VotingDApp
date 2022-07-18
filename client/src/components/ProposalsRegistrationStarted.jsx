import { useEffect } from "react";
import { useState } from "react";

function ProposalsRegistrationStarted({ contract, accounts, userStatus, proposals, setProposals }) {
    const [proposal, setProposal] = useState('');
    console.log(proposals)

    const registerProposal = async () => {
        try {
            console.log(proposal)
            const transac = await contract.methods.addProposal(proposal).send({ from: accounts[0] });
            // const addedProposal= await transac.events.VoterRegistered.returnValues.voterAddress;
            setProposals([...proposals, proposal])
            // setproposals('');
            console.log(`[registerProposal] - La proposal ${proposal} a ete ajoute`)
        } catch (error) {
            console.error(error.message);
        }
    }



    // console.log(userStatus)
    return (
        <div>
            {userStatus === 'owner' ? <div className=" w-full text-center">
                <table>
                    <thead>
                        <tr>
                            <th>Envoyer une proposition:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {proposals.map(propo => <td key={propo}>{propo}</td>)}
                        </tr>
                    </tbody>
                </table>
                <div className="mb-4">
                    <input className="bg-black p-4 rounded-xl" type="text" value={proposal} onChange={(e) => setProposal(e.target.value)} />
                    <button className="bg-purple-400 p-4 rounded-xl" type="submit" onClick={() => registerProposal()}>Register</button>
                </div>
            </div> : <div>Titi Vous êtes correctement enregistré. En attente de l'ouverture des propositions</div>}
        </div>
    );
}

export default ProposalsRegistrationStarted;
