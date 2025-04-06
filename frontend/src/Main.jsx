import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './chat/src/style.scss'
import App_main from './App_main';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login_main from './components/Login/Login_main';
import SignUp from './components/SignUp/Signup';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Market from './components/Marketplace/Marketplace'
import App from './chat/src/App';
import { AuthContextProvider } from './chat/src/context/AuthContext';
import { ChatContextProvider } from './chat/src/context/ChatContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyComponent from './components/Weather/Weather';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
        <App_main />
    ),
    children: [
      {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Home />,
      },
      {
        path: '/about',
        errorElement: <ErrorPage />,
        element: <About />,
      },
      {
        path: '/chat',
        errorElement: <ErrorPage />,
        element: (
          <AuthContextProvider>
            <ChatContextProvider>
              <React.StrictMode>
                <App />
             </React.StrictMode>
            </ChatContextProvider>
          </AuthContextProvider> 
        )
      },
      {
        path: '/marketplace',
        errorElement: <ErrorPage />,
        element: (
        <AuthContextProvider>
          <Market />,
        </AuthContextProvider>
        ),
      },
      {
        path: '/login',
        errorElement: <ErrorPage />,
        element: (
        <AuthContextProvider>
          <Login_main /> 
        </AuthContextProvider>
        ),
      },
      {
        path: '/signup',
        errorElement: <ErrorPage />,
        element: <SignUp />,
      },
      {
        path: '/weather',
        errorElement: <ErrorPage />,
        element: <MyComponent />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  // <RouterProvider router={router} />,
  document.getElementById('root')
);
