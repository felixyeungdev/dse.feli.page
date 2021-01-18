import admin from "firebase-admin";

const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const serviceAccount = {
    type: serviceAccountJson.type,
    projectId: serviceAccountJson.project_id,
    privateKeyId: serviceAccountJson.private_key_id,
    privateKey: serviceAccountJson.private_key,
    clientEmail: serviceAccountJson.client_email,
    clientId: serviceAccountJson.client_id,
    authUri: serviceAccountJson.auth_uri,
    tokenUri: serviceAccountJson.token_uri,
    authProviderX509CertUrl: serviceAccountJson.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccountJson.client_x509_cert_url,
};

!admin.apps.length &&
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://feli-page.firebaseio.com",
    });

async function authUser(token: string) {
    if (token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (err) {
            console.log(err);
        }
    }
    return null;
}

export default authUser;
