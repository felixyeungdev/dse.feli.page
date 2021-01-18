import monk from "monk";

const db = monk(process.env.MONGODB_URI);
const pastPaperExplanationCollection = db.get("past-paper-explanation");
const usersCollection = db.get("users");

export { pastPaperExplanationCollection, usersCollection };
export default db;
