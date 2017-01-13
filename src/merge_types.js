const mergeTypes = (types, options) => {

  const rootQueryName = (options !== undefined && options.rootQueryName) ? options.rootQueryName : 'Query';
  const rootMutationName = (options !== undefined && options.rootMutationName) ? options.rootMutationName : 'Mutation';

  const schema = `
    schema {
      query: ${rootQueryName},
      mutation: ${rootMutationName}
    }

    type ${rootQueryName} {
      ${types.map(({ queries }) => queries).join('')}
    }

    type ${rootMutationName} {
      ${types.map(({ mutations }) => mutations).join('')}
    }
  `;

  return [schema, ...types.map(({ type }) => type)];

}

export default mergeTypes;
