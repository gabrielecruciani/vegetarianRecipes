import React from 'react';
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from './routes/Login';
import Home from './routes/Home';
import Favourite from './routes/Favourite';
import QuickRecipes from './routes/QuickRecipes';


const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

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
        path: '/favourite',
        element: <Favourite />,
      },
      {
        path: '/quickRecipes',
        element: <QuickRecipes />,
      }
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
