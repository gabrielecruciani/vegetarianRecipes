import React, { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Login from './routes/Login';
import Home from './routes/Home';
import Favourites from './routes/Favourites';
import Contacts from './routes/Contacts';
import RecipeInfo from './routes/RecipeInfo';
import Error from './routes/Error';
import { useTheme } from './components/ThemeContext';


const AppLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/recipeinfo/:recipeId',
        element: <RecipeInfo />,
      },
      {
        path: '*',
        element: <Error />,
      }
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}