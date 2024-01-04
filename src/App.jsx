
import { PlayerProps } from './components/PlayerProps';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { db, auth } from "./config/firebase" // Import your Firebase configuration
import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore'

import { onAuthStateChanged } from 'firebase/auth';
import './App.css'
import { Login } from './components/login';
import { Navbar } from "./components/navbar"
import { ActiveBets } from './components/activebets';

function App() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // User does not exist in Firestore, add them
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || 'Anonymous',
            fakeCurrencyBalance: 1000,  // Initialize with default currency
            hasClaimedInitialCurrency: false,
            // Add other necessary fields
          });
        }
      } else {
        // User is signed out
        // Handle sign out
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = { <PlayerProps /> }/>
          <Route path="/login" element = { <Login /> } />
          <Route path="/active-bets" element = {<ActiveBets />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
