## 2.0.1 (2021-03-09)
 - FIX: Tweak to only generate a graphql schema file locally for development and help troubleshooting. Within GCP's read-only filesystem we use the in-memory schema. See `app.module.ts` for changes.

## 2.0.0 (2021-03-09)
 - Use version 8 of [@mondomob/gae-node-nestjs](https://github.com/mondo-mob/gae-node-nestjs) which is code-first approach to GraphQl.
 - Upgrade a bunch of libs

## 1.0.1 (2020-04-22)
 - Update npm test scripts, test names and added default client test
 - Update internal dependencies
 - Add composite index as example and to stop deployment warning about empty index

## 1.0.0 (2020-04-21)
 - NestJS 6 support and updated internal dependencies
