import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { WelcomeScreen, AppScreen } from './pages';
// import Switch from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={WelcomeScreen} />
        <Route path="/app" Component={AppScreen} />
      </Routes>
    </Router>
  );
}

export default App;
