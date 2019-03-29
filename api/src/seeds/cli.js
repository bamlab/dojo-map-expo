import { seeds } from './index';
import initDatabase from '../database';

console.log('Start seeding');
initDatabase()
  .then(seeds)
  .then(() => {
    console.log('Done seeding');
    process.exit();
  })
  .catch(e => console.error('Error during seeding', e));
