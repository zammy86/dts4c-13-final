import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { handleLogin, handleLogout } from "../redux/authentication"
import { authFirebase } from "../services/firebase/base"



const  LoginRegisLayout  = () =>  {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [belumLogin, setBelumLogin] = useState(false)
    onAuthStateChanged(authFirebase, (user) => {
        if (user) {
            setBelumLogin(false)
            dispatch(handleLogin())
            navigate('/')
        } else {
            setBelumLogin(true)
            dispatch(handleLogout())
        }
    })
    
    return (
        <>
            {
                belumLogin && <Outlet/>
            }
        </>
    )
}

export default LoginRegisLayout