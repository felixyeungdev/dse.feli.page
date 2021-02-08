import firebase from "firebase/app";
import "firebase/auth";

export default {
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://feli.page/terms",
    privacyPolicyUrl: "https://feli.page/privacy",
};
