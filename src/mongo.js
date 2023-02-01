const { MongoClient } = require('mongodb');

const url =  process.env.DB_URL || 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = process.env.DB_NAME || "annotation_app_node";

let collection;

const main = async () => {
  await client.connect();
  console.log("Conectado com sucesso ao MongoDB");
  
  const db = client.db(dbName);
  collection = db.collection('annotation');

  collection.createIndex({ 
    title: "text", 
    content: "text" 
  }, { 
    default_language: 'pt',
    weights: { title: 5, content: 1 }
  })
}

const getCollection = () => collection;

main()

module.exports = { getCollection }