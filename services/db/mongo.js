const client = new MongoClient(process.env.MONGODB_URI);
import { MongoClient } from 'mongodb';

async function getMongoClient() {
  return await client.connect();
}
const db = (await getMongoClient()).db(process.env.MONGODB_DB);

export default db;
