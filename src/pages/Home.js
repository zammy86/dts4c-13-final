import React from "react";
import { Container } from "@mui/system";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div>Home</div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
