import { Link } from 'react-router-dom'
import { db, auth } from '../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { getDocs, collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
export const Navbar = () => {
    const [user] = useAuthState(auth)
    const [fakeCurrencyBalance, setFakeCurrencyBalance] = useState(0);
    useEffect(() => {
        let unsubscribe = () => {};

        if (user) {
            const userDocRef = doc(db, "users", user.uid);

            // Listen for real-time updates
            unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    setFakeCurrencyBalance(doc.data().fakeCurrencyBalance);
                }
            }, (error) => {
                console.error("Error fetching user data: ", error);
            });
        }

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user]);

    const signUserOut = () => {
        signOut(auth);
    };
    return (
        <div className="navbar"> 
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/active-bets"> Active Bets </Link>
                <Link to="/login"> Login </Link>
            </div>
            <div className="user">
                {user && (
                    <>  
                        <p className='links'> Currency: {fakeCurrencyBalance}</p>
                        <p>{user?.displayName}</p>
                        <img src = {user?.photoURL || ""} width="20" height="20"/>
                        <button onClick={signUserOut}> Log Out </button>
                    </>)}
            </div>
        </div>
    )
}