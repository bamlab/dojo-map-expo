import { seeds } from '../../src/seeds';
import initDatabase from '../../src/database';
import { getDataLoaders } from '../../src/graphql/dataLoaders';

const db = {};
const dataLoaders = getDataLoaders();

beforeAll(async () => {
  try {
    db.connection = await initDatabase();
  } catch (e) {
    db.error = e;
  }
});

beforeEach(async () => {
  await db.connection.dropDatabase();
  await db.connection.synchronize();
  await seeds();

  global.ctx = {
    dataLoaders,
  };
});

afterAll(async () => {
  if (db.error) {
    console.error('Error with database', db.error);
  } else if (db.connection.isConnected) {
    await db.connection.close();
  }
});
