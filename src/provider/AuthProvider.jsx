import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
console.log(loading);
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        setLoading(true);
        try {
           
            await axios.post('https://whereisitserver.vercel.app/logout', {}, { withCredentials: true });
            
     
            await signOut(auth);
    
            setLoading(false);
        } catch (error) {
            console.error("Error during logout:", error);
            setLoading(false);
            throw error;
        }
    };
    

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const sendPasswordResetEmail = (email) => {
        setLoading(true);
        return firebaseSendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const authInfo = {
        user,
        name,
        setName,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        updateUserProfile,
        googleSignIn,
        sendPasswordResetEmail, 
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('state capture:',currentUser?.email)

            if(currentUser?.email){
                const user ={email: currentUser.email};
                axios.post('https://whereisitserver.vercel.app/jwt', user, { withCredentials: true })
    .then(res => { 
        console.log('login', res.data); 
        
    })

            }
            else{
                axios.post('https://whereisitserver.vercel.app/logout', {}, { withCredentials: true })
                .then((res) => {
                  console.log('Logout response:', res.data);
                  
                })
                .catch((error) => {
                  console.error('Logout error:', error);
                });
              


            }
            setLoading(false);
         
        });
        return () => {
            unsubscribe();
            
        };
    }, []);

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
