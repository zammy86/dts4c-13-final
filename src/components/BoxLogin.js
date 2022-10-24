import { Alert, Button, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { handleLogin } from "../redux/authentication"
import { authFirebase } from "../services/firebase/base"

const BoxLogin = (props) => {
    const { setOpenModal, fromComments, handlePostComment } = props
    // state for handle snackbar
    const [message, setMessage] = useState(undefined)
    const [messageStatus, setMessageStatus] = useState(undefined)
    const [openSnack, setOpenSnack] = useState(false)

    const dispatch = useDispatch()
    
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const email = data.get('email')
        const password = data.get('password')
        signInWithEmailAndPassword(authFirebase, email, password)
            .then(userCredenstial => {
                if (fromComments) {
                    handlePostComment(e)
                    setOpenModal(false)
                }
                dispatch(handleLogin(userCredenstial.user))
            }, (error) => {
                setMessageStatus ('error')
                setOpenSnack(true)
                switch (error.code) {
                    case  'auth/user-not-found' :
                        setMessage('Login Gagal, User Tidak ditemukan')
                        break
                    case  'auth/wrong-password' :
                        setMessage('Login Gagal, Password Salah')
                        break
                    case  'auth/invalid-email' :
                        setMessage('Login Gagal, Email Salah')
                        break
                    default :
                    setMessage('Error Tidak diketahui')
                    break
                }
            })
    }

    const handleClose = () => {
        setOpenSnack(false)
        setMessage(undefined)
    }
    return (
        <>
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
                <Box component="form" noValidate={false} onSubmit={(e) => {handleSubmitLogin(e)}} sx={{ m: 2 }}>
                    <Grid container spacing={2}>
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
                    Login
                    </Button>
                </Box>
                <Typography>
                    Create Account <Link to="/regis">Registrasi</Link>
                </Typography>
                </Grid>
            </Grid>

            {/* info login if fail */}
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageStatus} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default BoxLogin