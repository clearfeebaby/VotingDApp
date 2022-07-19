import { useEffect, useState } from "react";
import wellDone from "../assets/img/wellDone.svg";
function VotesTallied({ accounts, contract, proposals }) {
    const [winner, setWinner] = useState(0)

    const getWinner = async () => {
        setWinner(await contract.methods.winningProposalID().call())
    }

    useEffect(() => {
        getWinner()
    }, [])

    return (
        <div>
            <img src={wellDone} className="w-4/12 m-auto mt-16" alt="" />
            <div className=" w-full text-center text-3xl mt-3 "> Le gagnant est la proposition <em>numero {parseInt(winner) + 1}</em>: <em>{proposals[winner]}</em></div>
        </div >
    );
}

export default VotesTallied;
