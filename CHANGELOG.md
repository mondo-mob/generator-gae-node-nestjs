## 2.2.0 (2021-03-31)
- **Secrets!!!** .... but without the hassle. Excited to be able to have config trigger a secret to be resolved by simply using `SECRET(MY_SECRET_KEY)` 
  as the value of any string configuration property within any json configuration file inside `config/`. As long as your secret has been 
  set correctly in your project using `./etc/scripts/gcp-secret <your-project-id> <secret-key> <secret-value>` then the configuration's value 
  will be replaced with the secret value before the configuration module completes and makes configuration available
  - `gcpProjectId` config property added to enable a different project id to be used for gcp resources. This is mainly for locally development
    so that we can use `-dev` gcp project to resolve secrets. This has been automatically set in `development.json` as convention and
    this property is currently only used for resolving secrets.
  - No calls to GCP secret manager will be made if there are no properties with the `SECRET()` construct
  - See the generated root `README.md` for instructions on secrets
- Added a convenience function to `gcp-setup` to set up a CI service account with the correct permissions. Just uncomment the line
  that makes a call to this and your service account will be set up as part of the script (for the specified project id).

## 2.1.5 (2021-03-29)
- Enable appengine api by default for deployments in the `gcp-setup` script

## 2.1.4 (2021-03-29)
- FIX:  missing `test-helpers.ts` has been added in
- Script to help create GCP project with App Engine. See root readme
- Improve local data bootstrappers to make it easier to add others by implementing common interface and configuring provider

## 2.1.3 (2021-03-26)
- Fix an existing issue with Activate and get it to redirect to signin page with a toast after activation successful
- Internal refactor so showMessage(msg, errorBoolean) is replaced with showMessage(msg) and showErrorMessage(msg | error)

## 2.1.2 (2021-03-26)
- A few more HOC usages converted to hooks in generated client code

## 2.1.1 (2021-03-26)
- Generator lib updates and generator lint/styling. Should be no change to generated output from v2.1.0.

## 2.1.0 (2021-03-26)
- `client/` now has `react-scripts` updated to latest 
- Big cleanup of older style components. Replaced HOC usage with hooks
- Some basic styling improvements to make a big difference to the generated app
- Internal dependency updates


## 2.0.4 (2021-03-11)
- Update GQL HTTP requests with operations query string. This makes it easier to troubleshoot network traffic without 
  inspecting the payload by simply adding the operation names as a query string parameter client-side and these parameters get ignored.
  This also appears in the app-engine logs and is easier to trace server-side too.

## 2.0.3 (2021-03-11)

- Turn on nest 'enhancers' for field resolvers by default. Without this, @ResolveField functions do not execute NestInterceptor implementations, nor ExceptionFilters. This hides any error logging that may occur as a result of an error inside field resolution functions or skip specific response handling. There is a risk of a performance issue as described in: https://docs.nestjs.com/graphql/other-features#exception-filters but only in the case of returning 'thousands' of records from field resolvers. By default, we do not have any enhancers so this seems a better default. The link also provides a way to skip an enhancer if you only want to skip execution of an enhancer that is not necessary for your field resolver:

  ```
  export function isResolvingGraphQLField(context: ExecutionContext): boolean {
  if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;
      return parentType !== 'Query' && parentType !== 'Mutation';
  }
  return false;
  }
  ```

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
