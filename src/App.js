import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DetailNews from "./pages/DetailNews";

import { lazy, Suspense } from "react";
import Regis from "./pages/Regis";
import Login from "./pages/Login";
import LoginRegisLayout from "./pages/LoginRegisLayout";
const NewsLayout = lazy(() => import('./pages/NewsLayout'));
// const LoginRegisLayout = lazy(() => import('./pages/LoginRegisLayout'));
// const Login = lazy(() => import('./pages/Login'));
// const Regis = lazy(() => import('./pages/Regis'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense><NewsLayout /></Suspense>}>
        <Route path="/" element={<Home />}/>
        <Route path="/news" element={<DetailNews />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>

      <Route path="/login" element=<Suspense fallback={null}><LoginRegisLayout /></Suspense>>
          <Route path="/login" element=<Login />></Route>
      </Route>
      
      <Route path="/regis" element=<Suspense fallback={null}><LoginRegisLayout /></Suspense>>
          <Route path="/regis" element=<Regis />></Route>
        </Route>
      
      <Route path="*" element={<><h1>Not Found</h1></>}></Route>
    
    </Routes>
  );
}

export default App;
