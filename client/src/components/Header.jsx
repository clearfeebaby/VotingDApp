import useEth from "../contexts/EthContext/useEth";

function Header({ statusWorkflowNb, userStatus }) {
    const workflowStatus = {
        0: 'Début de l\'enregistrement des participants',
        1: 'Début de l\'enregistrement des propositions',
        2: 'Fin de l\'enregistrement',
        3: 'Début des votes',
        4: 'Fin des votes',
        5: 'Nous avons un vainqueur !'
    }
    const userStatusDisplay = {
        'owner': 'Propriétaire',
        'voter': 'Electeur',
        'nonVoter': 'Non enregistré'
    }
    const { state: { accounts } } = useEth();
    // const [voterAddress, setVoterAddress] = useState('');

    return (
        <header>
            <div className="bg-black w-full flex justify-between items-center py-8 px-4">
                <p>Mathieu App</p>
                <p>Current status: {workflowStatus[statusWorkflowNb]}</p>
                <div>
                    <p>{userStatusDisplay[userStatus]}</p>
                    <p>{accounts}</p>
                </div>
            </div>
        </header >
    );
}

export default Header;
