import monk from "monk";

const db = monk(process.env.MONGODB_URI);
const pastPaperExplanationCollection = db.get("explanations");
const usersCollection = db.get("users");
const pendingExplanationsCollection = db.get("pendingExplanations");
const explanationsCollection = db.get("explanations");
const videosCollection = db.get("videos");

export {
    pastPaperExplanationCollection,
    usersCollection,
    pendingExplanationsCollection,
    explanationsCollection,
    videosCollection,
};
export default db;
