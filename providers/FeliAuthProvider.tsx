import { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import nookies from "nookies";
import initialiseApp from "../firebase/client/initialiseApp";

const AuthContext = createContext({ currentUser: null });

export const AuthProvider = ({ children }) => {
    initialiseApp();
    const [currentUser, setCurrentUser] = useState<firebase.User>(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                nookies.set(undefined, "token", "", {});
                return;
            }
            const token = await user.getIdToken();
            setCurrentUser(user);
            nookies.set(undefined, "token", token, {
                path: "/",
            });
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
