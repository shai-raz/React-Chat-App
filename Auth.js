import React, { useEffect, useState } from "react";
import app from "./firebase.js";
import { User } from "./User.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                const userObject = new User(user.uid, user.email)
                setCurrentUser(userObject)

            } else {
                setCurrentUser(null)
            }
            setPending(false)
        })
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};