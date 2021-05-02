import firebase from "../firebase";
import { useEffect, useState, createContext } from "react";


export const UserContext = createContext();

export function UserProvider({ children }) {
    const [currentUser,setCurrentUser] = useState({})
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUserLoggedIn(!!user);
            setCurrentUser(user)
        });
    }, []);
    const contextValue = {
        isUserLoggedIn,
        currentUser
    }
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}