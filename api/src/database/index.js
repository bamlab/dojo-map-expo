import { createConnection } from 'typeorm';
import ormconfig from './ormconfig';

const initDatabase = () => createConnection(ormconfig);

export default initDatabase;
