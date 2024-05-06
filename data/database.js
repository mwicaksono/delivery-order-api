const { MongoClient } = require('mongodb');

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017'
    );

    database = client.db('restaurant');
}

function getDb() {
    if (!database) {
        throw new Error('You must connect first');
    }
    return database;
}

module.exports = {
    connectToDatabase, getDb
}