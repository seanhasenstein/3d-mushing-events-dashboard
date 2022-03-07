import { mongoClientPromise } from './connect';
import * as event from './event';
import * as registration from './registration';

async function connectToDb() {
  const client = await mongoClientPromise;
  return client.db();
}

export { connectToDb, event, registration };
