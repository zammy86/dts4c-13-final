import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DetailNews from "./pages/DetailNews";

import { lazy, Suspense } from "react";
import Regis from "./pages/Regis";
import Login from "./pages/Login";
import LoginRegisLayout from "./pages/LoginRegisLayout";
import LoadingSpinner from "./components/LoadingSpinner";

export const ThemeContext = createContext(null);

const NewsLayout = lazy(() => import("./pages/NewsLayout"));
// const LoginRegisLayout = lazy(() => import('./pages/LoginRegisLayout'));
// const Login = lazy(() => import('./pages/Login'));
// const Regis = lazy(() => import('./pages/Regis'));

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NewsLayout />
            </Suspense>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/search/:keywords" element={<Home />} />
          <Route path="/news" element={<DetailNews />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/login" element={<LoginRegisLayout />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route path="/regis" element={<LoginRegisLayout />}>
          <Route path="/regis" element={<Regis />}></Route>
        </Route>

        <Route
          path="*"
          element={
            <>
              <h1>Not Found</h1>
            </>
          }
        ></Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
