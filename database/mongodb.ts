import monk from "monk";
import { Db, MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) throw new Error("Missing environment variable MONGODB_URI");
if (!MONGODB_DB) throw new Error("Missing environment variable MONGODB_DB");

const globalAny: any = global;
let cached: {
    promise?: Promise<any>;
    connection?: {
        client?: MongoClient;
        db?: Db;
    };
} = globalAny.mongo;
if (!cached) cached = globalAny.mongo = {};

export enum DBCollections {
    explanations = "explanations",
    users = "users",
    pendingExplanations = "pendingExplanations",
    videos = "videos",
}

const db = monk(MONGODB_URI);
const pastPaperExplanationCollection = db.get("explanations");
const usersCollection = db.get("users");
const pendingExplanationsCollection = db.get("pendingExplanations");
const explanationsCollection = db.get("explanations");
const videosCollection = db.get("videos");

async function connectToDatabase(): Promise<{
    client?: MongoClient;
    db?: Db;
}> {
    if (cached.connection) return cached.connection;
    if (!cached.promise) {
        const connection: {
            client?: MongoClient;
            db?: Db;
        } = {};
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        cached.promise = MongoClient.connect(MONGODB_URI, options)
            .then((client) => {
                connection.client = client;
                return client.db(MONGODB_DB);
            })
            .then((db) => {
                connection.db = db;
                cached.connection = connection;
            });
    }
    await cached.promise;
    return cached.connection;
}

export {
    pastPaperExplanationCollection,
    usersCollection,
    pendingExplanationsCollection,
    explanationsCollection,
    videosCollection,
    connectToDatabase,
};
export default db;
