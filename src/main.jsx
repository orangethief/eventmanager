import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EventDetailsPage from './pages/EventDetailsPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CreateEventPage from './pages/CreateEventPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { Layout } from './pages/Layout.jsx';
import { LogOutPage } from './pages/LogOutPage.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/events/:id",
        element: <EventDetailsPage />,
      },
      {
        path: "/login/",
        element: <SignInPage />,
        loader: () => ({
          anonymous: true,
        })
      },
      {
        path: "/signup/",
        element: <SignUpPage />,
        loader: () => ({
          anonymous: true,
        })
      },
      {
        path: "/logout/",
        element: <LogOutPage />,
      },
      {
        path: "/new-event/",
        element: <CreateEventPage />,
        id: 'new-event',
        loader: () => ({
          isProtected: true,
        })
      }
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
