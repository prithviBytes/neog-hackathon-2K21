import firebase from "../../firebase"
import { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import Auth from "../Auth/Auth";
export default function PrivateRoute({path, ...props}) {
    //JUST FOR NOW SINCE WE DONT HAVE A AUTH CONTEXT
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        firebase
            .auth().onAuthStateChanged((user) => {
                setUserLoggedIn(!!user)
            })
    }, [])
    return isUserLoggedIn ? (
        <Route {...props} path={path} />
    ):(
        <Route {...props} element={<Auth  from={path} />} /> 
    )
}