const { makeExecutableSchema } = require('graphql-tools');
const fileLoader = require('./file_loader');
const mergeTypes = require('./merge_types');
const mergeResolvers = require('./merge_resolvers');

const mergeGraphqlSchemas = (folderPath, debug = false) => {
  const typesArray = fileLoader(`${folderPath}/types`);
  const resolversArray = fileLoader(`${folderPath}/resolvers`);

  const typeDefs = mergeTypes(typesArray);
  const resolvers = mergeResolvers(resolversArray);

  if (debug === true) {
    console.log('===> SCHEMA: ', typeDefs); // eslint-disable-line
    console.log('===> RESOLVERS: ', resolvers); // eslint-disable-line
  }

  return makeExecutableSchema({ typeDefs, resolvers });
};

module.exports = { mergeGraphqlSchemas, mergeResolvers, mergeTypes };
