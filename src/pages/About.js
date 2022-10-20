import React from "react";
import { Container } from "@mui/system";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div>About</div>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
