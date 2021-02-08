import initClient from "./initClient";
import firebase from "firebase/app";
import "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type FirebaseUser = firebase.User | null;

const AuthContext = createContext<{ currentUser: FirebaseUser }>({
    currentUser: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    initClient();
    const [currentUser, setCurrentUser] = useState<FirebaseUser>(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                return;
            }
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
