const config = require('config');
const entities = require('./entities').default;

// ES5 syntax is needed by typeorm
module.exports = {
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  synchronize: true,
  migrationsRun: false,
  logging: process.env.NODE_ENV !== 'test' ? ['error', 'query', 'schema'] : [],
  entities,
  migrations: process.env.CLI ? ['src/database/migrations/**/*.js'] : [],
  subscribers: ['src/database/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};
