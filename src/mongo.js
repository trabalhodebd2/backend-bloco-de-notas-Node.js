const { MongoClient } = require('mongodb');

const url =  process.env.DB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = process.env.DB_NAME;

async function main() {
  await client.connect();
  console.log("Conectado com sucesso ao MongoDB");
  
  const db = client.db(dbName);
  const collection = db.collection('annotation');

  return collection;
}

const collection = main()
  .then(console.log)
  .catch(console.error);

module.exports = collection