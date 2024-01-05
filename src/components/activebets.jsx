import { useEffect, useState, useContext } from 'react'
import { AppContext } from '../App';

export const ActiveBets = () => {
    const {bets} = useContext(AppContext)

    const handleChange = (event) => {
        setBetAmount(event.target.value)
    }

    const tester = () => {
        console.log(bets)
    }

    return (
        <>
        <h1>Active Bets:</h1>
        <div className='input'>
            <input onChange={handleChange} placeholder='Enter Bet Amount...'></input>
            <button onClick={tester}>Submit Bet</button>
        </div>
        <div>
            {bets.map((bet) => {
                return (
                <p>{bet.name} {bet.bet}</p>
                )
            })}
        </div>
        </>
    )
}