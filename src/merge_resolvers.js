const mergeResolvers = (resolvers, options) => {

  const rootQueryName = (options !== undefined && options.rootQueryName) ? options.rootQueryName : 'Query';
  const rootMutationName = (options !== undefined && options.rootMutationName) ? options.rootMutationName : 'Mutation';

  const queryResolvers = Object.assign(
    {},
    ...resolvers.map(({ queries }) => queries)
  );

  const mutationResolvers = Object.assign(
    {},
    ...resolvers.map(({ mutations }) => mutations)
  );

  const subQueriesResolvers = Object.assign(
    {},
    ...resolvers.map(({ subQueries }) => subQueries)
  );

  const resolverObject = {}
  resolverObject[rootQueryName] = queryResolvers
  resolverObject[rootMutationName] = mutationResolvers

  return Object.assign(
    resolverObject,
    subQueriesResolvers
  );

}

export default mergeResolvers;
