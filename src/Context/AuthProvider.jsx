import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {

        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password)
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    };

    const dltUser = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const observer =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            observer();
        }
    }, []);

    // console.log(user);

    const authData = {
        user,
        setUser,
        createUser,
        dltUser,
        loginUser,
        loading, 
        setLoading,
        updateUser,
        googleLogin,
    }
    
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;