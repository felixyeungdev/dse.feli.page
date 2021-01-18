import firebase from "firebase/app";
import "firebase/app";
import config from "./config";

export default function initialiseApp(): void {
    !firebase.apps.length && firebase.initializeApp(config);
}
