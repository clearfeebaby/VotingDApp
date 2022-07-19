import { useEffect, useState } from "react";

function VotesTallied({ accounts, contract, proposals }) {
    const [winner, setWinner] = useState(0)

    const getWinner = async () => {
        setWinner(await contract.methods.winningProposalID().call())
    }

    useEffect(() => {
        getWinner()
    }, [])

    // useEffect(() => {
    //     tallyVote()
    // }, [])
    console.log(proposals)
    return (
        <div>
            <div className=" w-full text-center"> Le gagnant est la proposition <em>numero {parseInt(winner) + 1}</em> dont voici la description <em>{proposals[winner]}</em></div>
        </div >
    );
}

export default VotesTallied;
