function VotingSessionEnded({ contract, accounts, voterAdresses, userStatus, proposals }) {
    return (
        <>
            {userStatus === 'owner' &&
                <div className="w-full text-center">
                    <div>Liste des électeurs enregistrés:</div>
                    <div>
                        {voterAdresses.map(voterAdress => <div key={voterAdress}>{voterAdress}</div>)}
                    </div>
                </div>}
            <div className="w-full text-center">
                <div>Liste des propositions enregistrés:</div>
                <div>
                    {proposals.map(proposal => <div key={proposal}>{proposal}</div>)}
                </div>
            </div>
        </>
    );
}

export default VotingSessionEnded;
