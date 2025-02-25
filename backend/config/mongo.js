const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pablvasq:19Ures72@center-for-air.lxfem.mongodb.net/test?retryWrites=true&w=majority&appName=center-for-air";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
  }
}

module.exports = { run, client };