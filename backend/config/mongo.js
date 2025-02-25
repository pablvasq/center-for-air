const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pablvasq:19Ures72@center-for-air.lxfem.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=center-for-air";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    //trict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
        await client.connect();
        // Log connected database name
        console.log("Connected to database:", client.db().databaseName);
        
        // Additional details
        const serverInfo = await client.db().admin().serverInfo();
        console.log("Server Info:", serverInfo);

        const dbs = await client.db().admin().listDatabases(); // List all databases
        console.log("All databases:", dbs);
    } catch (e) {
        console.error("Failed to connect to MongoDB", e);
    }
}

module.exports = { run, client };