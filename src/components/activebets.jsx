import { MultiBetSlip } from './multibetslip';
import { PendingBets } from './pendingbets'

export const ActiveBets = () => {
    return (
        <>
        <h1>Active Bets:</h1>
        <div>
            <MultiBetSlip/>
            <PendingBets/>
        </div>
        </>
    )
}