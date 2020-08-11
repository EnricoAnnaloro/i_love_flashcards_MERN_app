import React, {useEffect} from 'react';
import { Route } from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import Navbar from './components/Navbar/Navbar';
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
        <Route path="/explore">
          <ExplorePage></ExplorePage>
        </Route>
        <Route path="/" exact>
          <LandingPage></LandingPage>
        </Route>
      </div>
    </div>
  );
}

export default App;
