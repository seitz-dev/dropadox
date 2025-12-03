# Testing for Dropadox

## How does it work?

Dropadox currently has support for unit and integration tests. 
Unit tests do not require any specialized setup as the node environment is typically enough to run standard functions.
However, API endpoint tests are essentially integration tests, and require the Nuxt/Nitro server to be setup.

### How to setup & run tests

This is important to follow, because otherwise you will get failing tests.

1. Build Nuxt Server
    - run: `npm run build`, and await it's completion.
2. Setup test environment file:
    - create in root: `.env.test`
    - `JSON_SECRET_KEY` must be populated
    - `DB_FILE_NAME` must point to a new database, NOT dev database.
3. Run DB migrations:
    - run: `npm run test:push`
4. Start tests:
    - run: `npm run test`

All tests should pass!