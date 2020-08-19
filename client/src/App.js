import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar/Navbar';
import LandingPage from './components/Pages/LandingPage/LandingPage';
import ExplorePage from './components/Pages/ExplorePage/ExplorePage';
import UserPage from './components/Pages/UserPage/UserPage';
import CardSetPage from './components/Pages/CardSetPage/CardSetPage';
import './App.css';

import store from './store/store';
import { loadUser } from './store/actions/index';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="App__Content">
        <Route path="/cardSets/:setID"><CardSetPage /></Route>
        <Route path="/user/:username"><UserPage /></Route>
        <Route path="/explore"><ExplorePage /></Route>
        <Route path="/" exact><LandingPage /></Route>
      </div>
    </div>
  );
}

export default App;
