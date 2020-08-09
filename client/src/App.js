import React from 'react';
import { Route } from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/explore">
        <ExplorePage></ExplorePage>
      </Route>
      <Route path="/" exact>
        <LandingPage></LandingPage>
      </Route>
    </div>
  );
}

export default App;
