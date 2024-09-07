import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EventDetailsPage from './Pages/EventDetailsPage.jsx';
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import CreateEventPage from './Pages/CreateEventPage.jsx';
import HomePage from './Pages/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/events/:id",
    element: <EventDetailsPage />
  },
  {
    path: "/login/",
    element: <SignInPage />
  },
  {
  path: "/signup/",
  element: <SignUpPage />
  },
  {
  path: "/newevent/",
  element: <CreateEventPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)