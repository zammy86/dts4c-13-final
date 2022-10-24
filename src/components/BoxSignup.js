import { Alert, Avatar, Button, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authFirebase } from '../services/firebase/base';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const BoxSignup = () => {
    
    
    const navigate = useNavigate();
    const [statusLogin, setStatusLogin] = useState(false)
    // state for handle snackbar
    const [message, setMessage] = useState(undefined)
    const [messageStatus, setMessageStatus] = useState(undefined)
    const [openSnack, setOpenSnack] = useState(false)
    // onAuthStateChanged(authFirebase, (user) => {
    //     setStatusLogin(true)
    //     return navigate('/')
    // })
    const handleClose = () => {
      setOpenSnack(false)
      setMessage(undefined)
  }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const fullName = data.get('fullName')
        createUserWithEmailAndPassword(authFirebase, email, password)
        //jika behasil regis, maka update displayName pada profil user tsb
        .then (userCredential => {
            if (userCredential.user) {
                updateProfile(authFirebase.currentUser, {
                    displayName: `${fullName}`, 
                }).then(() => {
                    //jika berhasil update, maka loginkan ke sistem firebase
                    signInWithCredential(authFirebase, userCredential)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user)
                            Navigate('/')
                        })
                })
            }
        }, error => {
          setMessageStatus ('error')
          setOpenSnack(true)
          const msgError = error.code.split("/")
          setMessage(`Error caused ${msgError[1].split("-").join(" ")}`)
        })
        .catch(err => console.log(err.code))
    
    };

    return (
        <>
      
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
        </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
           {/* info login if fail */}
           <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageStatus} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )  
}

export default BoxSignup