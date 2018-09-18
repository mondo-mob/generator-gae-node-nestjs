# Getting Started

This project has been generated from a template that uses nestjs + typescript, and is designed to be used with app engine.

The project should be ready to run locally straight away - though some configuration is needed to use all the functionality within app engine.

The nest documentation (https://github.com/nestjs/nest) is invaluable for getting started.

## Running (locally)

Datastore emulator: `gcloud beta emulators datastore start`

Server: `npx server` from `server` directory

Client: `npm start` from `client` directory

## New: Adding server modules

Run `yo @3wks/gae-node-nestjs:module tests` from root directory (directory containing client / server) where `tests` is the name of your module (by convention this is plural). This generator can bootstrap a new module with repository + service + graphql.

**NOTE:** Remember to add new modules to your AppModule

#Environments
The following environments are pre-configured for you in the `server/config` directory of the project.:
* `development` - your local machine
* `dev` - App Engine project called <%= slugify(project) %>-dev for development
* `uat` - App Engine project called <%= slugify(project) %>-uat for user acceptance testing
* `prod` - App Engine project called <%= slugify(project) %>-prod for production

Note there is also a `default` config which applies to all environments unless overridden.

# App Engine Setup

## Deploying to App Engine
You will need to create GCP projects for each environmemnt you want to deploy to:
* `<%= slugify(project) %>-dev`
* `<%= slugify(project) %>-uat`
* `<%= slugify(project) %>-prod`

To deploy to these environments run the following from the `server` directory, substituting `dev` for your target environment:

```
npm run deploy:dev
```

Note: The first time you run the deploy you may be asked which region to deploy in. At this stage (Aug 2018) we are choosing `us-central` instead of `australia-southeast1` because:
* Cloud tasks is not available in australia - it's in alpha and can only call app engine in same region
* Datastore access from nodejs is broken in Australia (min 700ms per request)

## System user bootstrap
The `development` environment is configured to run bootstrap each time the server is started. If not already present, bootstrap will create a system user `admin@3wks.com.au` with password `password`.

For all other environments (`dev`, `uat`, `prod`), auto-bootstrap is off by default.

To create/update the system user you need to run bootstrap manually by running the following command substituting `development` for your target environment:

```
npx server s c --env dev /system/migrate/bootstrap
```
A new password will be randomly generated and can be found in the logs. Look for an entry in the form of:

```
2018-08-08 16:08:54.834 AEST Bootstrapping admin account with id 12345 and password <the password>
```

To turn auto-bootstrap on/off set the `bootstrap` flag to true/false in the appropriate environment config file in `server/config/`


For more information on how the above command works see the migrations section.

## Google Sign In

1.  Create oauth credentials (client / secret) through the google console
2.  Ensure the following a redirect to `{host}/auth/google/login/callback` is enabled
3.  Add Google+ API in google console
4.  Add the client key and secret to the `config/{env}.json` file
5.  Change the `enabled` flag to true

## Google Sign Up

1.  Follow the above steps
2.  Add allowed email domains to the `signUpDomains` setting (e.g. 3wks.com.au)
3.  Add any roles users should have by default

## Emails + Invites + Password Reset

1.  Setup client as per "Google Sign In"
2.  Add additional redirect to `{host}/system/gmail/setup/oauth2callback`
3.  Set `gmailUser` in `server/config/{env}.json` to the admin account you will sign in as in the next step.
4.  Visit the URL `{host}/system/gmail/setup` signed in as the admin user

## SAML

1.  Update the config file in the affected environment. These properties should include:

    - `identityProviderUrl` - The URL of the identity provider to use as part of login
    - `cert` - The certificate to be used for validating SAML requests - this should be provided by the SAML server

2.  Enable SAML signup by changing the `enabled` flag to true in the configuration

# Adding Functionality

## New Modules

Modules are an important concept in nestjs - they wrap up related units of functionality, so they can be imported by other modules, included in libraries etc.

There should only be one module per folder within your solution, and there should ideally not be any circular dependencies.

To create a new module run the following from your root project directory:

`yo @3wks/gae-node-nestjs:module tests`

To create a module by hand:

1.  Create a new folder
2.  Create a new module file
3.  Create a new class and annotate it using the `@Module` provided by nestjs
4.  Add module to the application module

```
@Module({
  // add controllers, providers etc here
})
class BlahModule {}
```

## New Datastore Entities

1.  Create a new repository file - usually there should be 1 per module
2.  Create a new repository class extending from the `Repository` base class provided by `@3wks/gae-node-nestjs`.
3.  Define a validation schema using the `validation` namespace exported by `@3wks/gae-node-nestjs`. See io-ts documentation to see how this works (https://github.com/gcanti/io-ts)
4.  Optional define default values / indexed fields via the repository options

## Anonymous Access

By default all endpoints require authorization.

Add an `@AllowAnonymous` to either your controller method, graphql resolver or to the class they are implemented in to allow access to users that are not authorized.

## Restricted Endpoints

By default all endpoints require authorization - but do not require specific roles.

Add an `@Roles` to either your controller method, graphql resolver or to the class they are implemented in to restrict which roles can access resources.

## Tasks

### Creating a task

1.  Add a method to a controller / create a new controller with a new method
2.  Add a `@Post` annotation
3.  Add a path for the endpoint - it should be under `/tasks/{taskName}`
4.  Annotate the endpoint with `@Task`

### Triggering a task

1.  Create a service which extends `TaskQueue`
2.  Add a service method which delegates to `enqueue` with the task name and payload

## Cron

1.  Add a method to a controller / create a new controller with a new method
2.  Add a `@Get` annotation
3.  Add a path for the endpoint - this can by anything
4.  Annotate the endpoint with `@Cron`
5.  Add your cron definition to cron.yaml (https://cloud.google.com/appengine/docs/standard/python/config/cronref)

## GraphQL

GraphQL is a pretty big topic and there is great documentation available on it at https://www.apollographql.com/docs/react/.

### Main concepts

GraphQL is a flexible RPC protocol over HTTP that lets you request data a format that matches the requirements of your front end. It can provide functionality for queries (GET), mutations (POST/PUT/DELETE) and and subscriptions (websockets).

### Adding to a module

1.  Add a .graphqls file to your module folder
2.  Add a resolver class - this will provide the implementation of GraphQL functionality
3.  Annotate class with `@Resolver()` provided by nestjs. The string parameter should map to the GraphQL type this class is responsible for
4.  Add this class to the providers list of the module

```
@Resolver('Blah')
class BlahResolver {
   constructor(
     // injected types here
   ) {}
}
```

### Adding a computed field

1.  Add a field to the type definition in the graphqls file
2.  Add a method with the correct signature

```
async NAME(object, args, context): Promise<TYPE> { ... }
```

### Adding a query / mutation to server

1.  Add a query / mutation definition to the graphqls file
2.  Add a method with the correct signature

```
@Query('NAME') // The parameter is optional if the name of the method matches the implementation
async NAME(object, args, context): Promise<TYPE> { ... }
```

### Adding a query / mutation to client

1.  Add a Query / Mutation component to fetch / modify data to your existing component's render method.
2.  Create a **named** query using the `gql` tag
3.  Run `npm run graphql` from the client - this will generate types matching your query with the name you provided
4.  Add these types to the query / mutation component
5.  Add a callback as the child for the Query / Mutation component (this is called a render prop). This callback should return JSX and has access to the data / loading state etc.

```
const query = gql`
  query TestQuery {
    users {
      id
      name
    }
  }
`

const UsersList = <Query<TestQuery, TestQueryVariables> query={query} variables={{ ... }}>
  {
    ({data, loading}) => // render implementation goes here
  }
</Query>
```

## Migrations

Controller `@Post` endpoints annotated with `@System` and can only be accessed using a secret signed token. The `server` command is able to both regenerate the secret used for migrations and also to make calls.

E.g. The following command will trigger the 'bootstrap' migration (in migrations/migration.controller.ts).

```
npx server system call --env dev /system/migrate/bootstrap

or

npx server s c --env dev /system/migrate/bootstrap
```
