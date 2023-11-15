const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = await client.db("paltblock");

    return db;
}

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase();

    await db.collection("contacts").deleteOne({_id: new ObjectId(event._id)});

    const response = {
        statusCode: 200
    };

    return response;
};