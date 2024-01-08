import { useContext } from 'react'
import { AppContext } from '../App';
import { db, auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, writeBatch, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"

export const MultiBetSlip = () => {
    const {bets, setBets, betAmount, setBetAmount} = useContext(AppContext)
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
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
        const userRef = doc(db, 'users', user.uid)

        try {
            const userDoc = await getDoc(userRef)
            if (!userDoc.exists()) {
                throw new Error("User not found")
            }
            const currentBalance = userDoc.data().fakeCurrencyBalance;
            const newBalance = currentBalance - betAmount;

            if (newBalance < 0) {
                throw new Error("Insufficient Balance")
            }

            const batch = writeBatch(db)

            batch.update(userRef, { fakeCurrencyBalance: newBalance})

            batch.set(doc(betRef), {
                username: user.displayName,
                userId: user.uid,
                bets: bets,
                resolved: false,
                totalOdds: totalOdds.toFixed(2),
                amount: betAmount
            });

            await batch.commit()

            setBets([]);

            navigate("/")
            console.log('bet placed and user balance updated')
        } catch (error) { 
            console.log(error)
        }
    }


    return (
        <>
        {bets.length != 0 && (
            <div>
                {bets.length != 0 && <h2>Multi Bet Slip</h2>}
                {bets.map((bet, index) => {
                    return (
                        <p key={bet.id}>{bet.name} - Odds: {bet.bet}  </p>
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