import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/app";

const initClient = () => {
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
};

export default initClient;
