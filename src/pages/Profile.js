import React from "react";
import { Container } from "@mui/system";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <div>Profile</div>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
