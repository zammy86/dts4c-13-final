/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import "./styles/login.scss";
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BoxLogin from "../components/BoxLogin";
import { useSelector } from "react-redux";

const Login = () => {
  
  const authStore = useSelector(state => state.auth)
  const navigate = useNavigate()
    
  // useEffect(() => {
  //   console.log(authStore.userData)
  // })
  return (
    <div className="login-section">
      <Container className="container">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          className="login-wrapper"
        >
         
            <BoxLogin/>

        </Grid>
      </Container>
    </div>
  );
};

export default Login;
