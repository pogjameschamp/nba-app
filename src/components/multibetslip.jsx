import { useContext } from 'react'
import { AppContext } from '../App';
import { db, auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from 'firebase/firestore'
export const MultiBetSlip = () => {
    const {bets, betAmount, setBetAmount} = useContext(AppContext)
    const [user] = useAuthState(auth)
    const handleChange = (event) => {
    setBetAmount(event.target.value)  
    }
    const calculateMultiOdds = (bets) => {
        return bets.reduce((totalOdds, bet) => totalOdds * bet.bet, 1);
    };


    const betRef = collection(db, "bets")

    const totalOdds = calculateMultiOdds(bets)
    const payout = betAmount * totalOdds;

    const onSubmitBet = async () => {
        await addDoc(betRef, {
            username: user.displayName,
            userId: user.uid,
            bets: bets,
            resolved: false,
            totalOdds: totalOdds.toFixed(2),
            amount: betAmount
        })
    }

    return (
        <>
        {bets.length != 0 && (
            <div>
                {bets.length != 0 && <h2>Multi Bet Slip</h2>}
                {bets.map((bet) => {
                    return (
                        <p>{bet.name} - Odds: {bet.bet}  </p>
                    )
                })}
                <p>Total Combined Odds: {totalOdds.toFixed(2)}</p>
                <div className='input'>
                    <input onChange={handleChange} placeholder='Enter Bet Amount...'></input>
                    <button onClick={onSubmitBet}>Submit Bet</button>
                </div>
                {<p>Estimated Payout: {payout.toFixed(2)}</p>}
            </div> 
        )}
       
        </>

    )


}