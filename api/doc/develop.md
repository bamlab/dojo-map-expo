# Develop

## Run locally

```bash
yarn dev
```

> **Check 1:** You should see `Server is ready at http://localhost:3000/graphql` after some time

> **Check 2:** Open playground in your browser: `http://localhost:3000/graphql`

> **Check 3:** You can access your running database with `yarn connect_db`, password: "docker", then look for the tables with `\d`

## Debug

The debugging port is 9229.

- Chrome
  1. Go to [chrome://inspect](chrome://inspect)
  2. Click on "Configure..."
  3. Add `localhost:9229`
  4. The target will appear
- WebStorm
  1. Create a "Attach to Node.js/Chrome" configuration
  2. Specify `localhost` with port `9929` and check retry connection

## Using TypeORM

### Useful commands in development

- `yarn typeorm schema:drop` drops the database
- `yarn typeorm schema:syncs` syncs the database with your entities (don't use when you have production users)

## Data

You can run seeds with `yarn seeds`. They're automatically run when doing `yarn dev`.
When developing seeds, always check that the data does not exists yet - it should be idempotent.

## Project structure

- A `resolver` is a thin GraphQL layer where you call controllers
- A `controller` is where your business logic lies: it calls entities, repositories, other controllers, or services; and checks security
- An `entity` defines your model in your app and database
- A `repository` is where you'll do complex database queries if the methods of entities are too limited
