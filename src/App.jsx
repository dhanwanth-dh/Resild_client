import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Components/Home"));
const Skills = lazy(() => import("./Components/Skills"));

import Login from './Components/Login'
import Signup from './Components/Signup'
import Back from './Components/Back';

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get("isLoggedIn", (result) => {
        setIsLoggedIn(result.isLoggedIn === true);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <>
      <Back />

      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>

            {/* Default landing */}
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
            />

            {/* Protected routes */}
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />

            <Route
              path="/skills"
              element={isLoggedIn ? <Skills /> : <Navigate to="/" />}
            />

            {/* Public route */}
            <Route path="/signup" element={<Signup />} />

            {/* Fallback */}
            <Route
              path="/*"
              element={<Navigate to="/" />}
            />

          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
