import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/types';
import { WelcomeScreen, BooksPage } from './pages';

const AppRoutes = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
        <Routes>
            <Route path='/' element={user ? <Navigate to="/books" /> : <WelcomeScreen />} />
            <Route path='/books' element={ user ? <BooksPage /> : <Navigate to="/" />} />
        </Routes>
  )
};

export default AppRoutes;
