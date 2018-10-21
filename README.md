# graphql-disable-introspection-with-exceptions
Disable Introspection in GraphQL-JS with a simple validation rule, but add exceptions for certain safe types

Extends the [graphql-disable-introspection](https://github.com/helfer/graphql-disable-introspection) package that is used by default in the production mode of Apollo Server.

Queries that contain __schema or __type will fail validation with this rule, unless the certain type is passed in to this factory as an exception.

## Usage
The package can be installed from npm

```bash
npm install -save graphql-disable-introspection
```

It exports a factory function that returns a single validation rule which you can pass to your node GraphQL server with the validationRules argument.

### Apollo Server Example

```js
const { ApolloServer, gql } = require('apollo-server');
const disableIntrospectionExcept = require('graphql-disable-introspection-with-exceptions')

...

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // allow introspection by default in production
    introspection: true,
    validationRules: [
        // disable queries that contain __schema or __type, whilst allowing __type queries for the UserStatus enum
        disableIntrospectionExcept(['UserStatus']) 
    ]
});
```

This will now allow me to expose the UserStatus Enum values for use in the frontend

```gql
query getUserStatusEnumValues {
  __type(name: "UserStatus") {
    name
    enumValues {
      name
    }
  }
}
```
