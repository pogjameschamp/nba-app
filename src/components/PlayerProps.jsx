import Axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import { Bet } from "./bet"
import { AppContext } from '../App';

export const PlayerProps = () => {
    const [gameIds, setGameIds] = useState(null)
    const {bets, setBets} = useContext(AppContext)

    const apiKey = 'f929cd1a3078c312623a14e5f34252d2'
    const sportKey = 'basketball_nba'
    const regions = 'au'
    const markets = 'h2h'
    const oddsFormat = 'decimal'
    const dateFormat = 'iso'

    const handleEvent = (event, event2, id) => {
        const bet = {
            id: id,
            bet: event,
            name: event2
        }
        setBets([...bets, bet])
    }

    useEffect(() => {
        Axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat,
            }
        }).then((res) => {
            setGameIds(res.data)
        })
    }, [])

    return (
        <>
        {/* <button onClick={fetchData}> Get Match Odds </button> */}
        <div>
            {gameIds?.map((game) => {
                return (
                    <>
                    <Bet 
                        gameTime = {game.commence_time.slice(0, 10)}
                        homeTeam = {game.bookmakers[1]?.markets[0]?.outcomes[0].name}
                        awayTeam = {game.bookmakers[1]?.markets[0]?.outcomes[1].name}
                        homePrice = {game.bookmakers[1]?.markets[0]?.outcomes[0].price}
                        awayPrice = {game.bookmakers[1]?.markets[0]?.outcomes[1].price}
                        id = {game.id}
                        handleEvent = {handleEvent}
                    />
                    </>
                )
            })}
        </div>
        </>
    )
}