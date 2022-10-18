import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Regis from "./pages/Regis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/regis" element={<Regis />}></Route>
    </Routes>
  );
}

export default App;
