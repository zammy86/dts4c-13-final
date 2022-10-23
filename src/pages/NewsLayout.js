import { onAuthStateChanged } from "firebase/auth"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { handleLogin, handleLogout } from "../redux/authentication"
import { authFirebase } from "../services/firebase/base"



const  NewsLayout  = () =>  {
    const dispatch = useDispatch()
    
    onAuthStateChanged(authFirebase, (user) => {
        if (user) {
            dispatch(handleLogin(user))
        } else {
            dispatch(handleLogout())
        }
    })
    
    return (
        <>
            <Outlet/>
        </>
    )
}

export default NewsLayout