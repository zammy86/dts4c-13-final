import React from "react";
import "./styles/login.scss";
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
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
          <Grid item className="login-box">
            <Grid
              className="login-content"
              container
              alignContent="center"
              direction="column"
              alignItems="center"
              // alignContent="center"
            >
              <Grid className="title">
                <h1>Login</h1>
              </Grid>
              <Grid className="sub-title">
                <p>submit your email and password</p>
              </Grid>
              <Box
                className="box"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="password"
                    variant="outlined"
                    name="password"
                  />
                </div>
              </Box>
              <Button className="button" variant="contained" type="submit">
                <Link to="/">Login</Link>
              </Button>
              <Typography>
                Create Account <Link to="/login">Registrasi</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
