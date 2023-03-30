import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { WelcomeScreen, AppScreen, BooksPage } from './pages';
import { RootState } from './store/types';
// import Switch from 'react-router-dom';

function App() {

  const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <Router>
      <Routes>
        <Route path='/' Component={WelcomeScreen} />
        <Route path="/app" Component={AppScreen} />
        <Route 
          path="/books" element={!userLoggedIn ? <BooksPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
