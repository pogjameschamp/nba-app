export const Bet = (props) => {
    
    return (
        <>
        <div className='game-container'>
            <h1 className='team-names'>{props.gameTime}</h1>
            <h1 className='team-names'>{props.homeTeam} <button onClick={() => props.handleEvent(props.homePrice, props.homeTeam, props.id)} className="bet-button">{props.homePrice}</button></h1>
            <h1 className='team-names'>{props.awayTeam} <button onClick={() => props.handleEvent(props.awayPrice, props.awayTeam)} className="bet-button">{props.awayPrice}</button></h1>
        </div>
        </>
    )
}