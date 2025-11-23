import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import AllUsers from "./components/AllUsers";

function App() {
  // Simple auth check (User logged in hai ya nahi)
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/users" element={user ? <AllUsers /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;