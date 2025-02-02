import React from "react";
import { useContext } from "react";
import "./styles/footer.scss";
import { ThemeContext } from "../App";

export default function Footer() {
  const mode = useContext(ThemeContext);
  return (
    <div className="footer" id={mode.theme}>
      <p>Copyright 2022 camPRONews</p>
    </div>
  );
}
