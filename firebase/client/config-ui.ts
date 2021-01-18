import firebase from "firebase";

export default {
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            providerName: "Google",
            customParameters: {
                prompt: "select_account",
            },
            clientId:
                "140818689378-mpshne3ukb006rksmal25gam5pro3cin.apps.googleusercontent.com",
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: "googleyolo", // firebaseui.auth.CredentialHelper.GOOGLE_YOLO
    tosUrl: "https://feli.page/terms",
    privacyPolicyUrl: "https://feli.page/privacy",
};
