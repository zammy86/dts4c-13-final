import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Regis from "./pages/Regis";
import News from "./pages/News";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/news" element={<News />}>
        <Route path="/news/:id" element={<News />}></Route>
      </Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/regis" element={<Regis />}></Route>
    </Routes>
  );
}

export default App;
