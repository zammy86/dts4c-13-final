import React from "react";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
            <Grid
              container
              alignContent="center"
              direction="column"
              alignItems="center"
              // alignContent="center"
            >
              <Grid>Login</Grid>
              <Grid>submit your email and password</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
