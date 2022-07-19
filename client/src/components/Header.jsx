import useEth from "../contexts/EthContext/useEth";

function Header({ statusWorkflowNb, userStatus }) {
    const userStatusDisplay = {
        'owner': 'Propriétaire',
        'voter': 'Electeur',
        'nonVoter': 'Non enregistré'
    }
    const { state: { accounts } } = useEth();
    // const [voterAddress, setVoterAddress] = useState('');

    return (
        <header style= {{backgroundColor: '#2C3249'}}>
            <div className=" w-full flex justify-between items-center py-8 px-4">
                <div>
                    <p>{userStatusDisplay[userStatus]}</p>
                    <p>{accounts}</p>
                </div>
            </div>
        </header >
    );
}

export default Header;
