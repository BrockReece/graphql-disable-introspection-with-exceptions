const graphql = require('graphql')
const get = require('lodash.get')

module.exports = function (exceptions = []) {
  return (context) => {
    return {
      Field (node) {
        if (node.name.value === '__schema' || (node.name.value === '__type' && exceptions.indexOf(get(node, 'arguments.0.value.value')) === -1)) {
          context.reportError(
            new graphql.GraphQLError(
              'GraphQL introspection is not allowed, but the query contained __schema or __type and isn\'t an exception',
              [node]
            )
          )
        }
      }
    }
  }
}