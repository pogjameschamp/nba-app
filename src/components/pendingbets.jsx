import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App';
import { db, auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, writeBatch, doc, getDocs, query, where } from 'firebase/firestore'

export const PendingBets = () => {
    const {bets, setBets, betAmount, setBetAmount} = useContext(AppContext)
    const [activeBets, setActiveBets] = useState([])
    const [user] = useAuthState(auth)
    const betRef = collection(db, "bets")

    useEffect(() => {
        const fetchActivebets = async () => {
            try {
                    const q = query(betRef, where('userId', '==', user.uid) , where('resolved', '==', false))

                    const queryData = await getDocs(q)
                    
                    const betsData = queryData.docs.map(doc => doc.data())

                    setActiveBets(betsData)

            } catch (error) {
                console.log(error)
            }
        }

        if (user) {
            fetchActivebets();
        }

    }, [user])

    return (
        <div>
        <h1>Pending Bets:</h1>
        {activeBets.length > 0 ? (
            <ul>
                {activeBets.map((bet) => {
                    return (
                        <div>
                            <h2>Multi @ {bet.totalOdds} </h2>
                            <p> {bet.bets.length} Legs • Stake {bet.amount}</p>
                            <p> {(bet.totalOdds * bet.amount).toFixed(2)} Payout</p>
                            {bet.bets.map((betItem) => (
                                <p>{betItem.name}</p> 
                            ))}
                        </div>
                    )})}
            </ul>
        ) : (
            <p> No active bets found.</p>
        )}
        </div>
        
    )
}