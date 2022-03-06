import { mongoClientPromise } from './connect';
import * as registration from './registration';

async function connectToDb() {
  const client = await mongoClientPromise;
  return client.db();
}

export { connectToDb, registration };
