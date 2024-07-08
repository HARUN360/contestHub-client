
import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hukse/useAxiosPublic";
// import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // create user
    const creatUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // signIn
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password )
    }
    // signin google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    // logOut 
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    // update profile
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
          })
          
    }


    useEffect(()=> {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
           
            console.log('user in the auth state change', currentUser);
            setUser(currentUser);
            
              //  jwt start
              if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })

        }
        else{
        //  Todo: remove token(if token stored in the client side: local storage or coking)
        localStorage.removeItem('access-token');
        setLoading(false);
        }
        // jwt end


           
        });
        return () => {
            unSubscribe()
        }
    },[])
  

    const authInfo = {
        user,
        creatUser,
        signIn,
        signInWithGoogle,
        logOut,
        loading,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;