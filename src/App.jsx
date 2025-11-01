import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import Income from "./pages/Dashboard/Income.jsx"
import Home from "./pages/Dashboard/Home.jsx"
import Expense from "./pages/Dashboard/Expense.jsx"
import UserProvider from './context/userContext.jsx';



const App = () => {
  return (
    <UserProvider >
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>

    </UserProvider>



  )
}

export default App

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    // cleanup
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );

}

