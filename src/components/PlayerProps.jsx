import Axios from 'axios';
import { useState } from 'react'

export const PlayerProps = () => {
    const [gameIds, setGameIds] = useState(null)
    const apiKey = 'f929cd1a3078c312623a14e5f34252d2'
    const sportKey = 'basketball_nba'
    const regions = 'au'
    const markets = 'h2h'
    const oddsFormat = 'decimal'
    const dateFormat = 'iso'
    
    const fetchData = () => {
        Axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat,
            }
        }).then((res) => {
            console.log(res.data)
            setGameIds(res.data)
            console.log("This works")
        })
    }

    
    return (
        <>
        <div>
            <button onClick={fetchData}> Get Match Odds </button>
        </div>
        <div>
            {gameIds?.map((game) => {
                return (
                    <>
                        <div className='game-container'>
                            <h1 className='team-names'> {game.commence_time.slice(0, 10)} </h1>
                            <h1 className='team-names'> {game.bookmakers[1]?.markets[0]?.outcomes[0].name}  <button className='bet-button'>{game.bookmakers[1]?.markets[0]?.outcomes[0].price}</button></h1>
                            <h1 className='team-names'> {game.bookmakers[1]?.markets[0]?.outcomes[1].name} <button className='bet-button'>{game.bookmakers[1]?.markets[0]?.outcomes[1].price}</button> </h1>
                        </div>
                    </>
                )
            })}
        </div>
        </>
    )
}