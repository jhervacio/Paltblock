const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = await client.db("paltblock");

    return db;
}

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase();

    await db.collection("contacts").insertOne(event.body);

    const response = {
        statusCode: 201
    };

    return response;
};