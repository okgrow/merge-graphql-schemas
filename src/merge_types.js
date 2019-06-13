import { mergeTypeDefs } from 'graphql-toolkit';
import { print } from 'graphql';

const mergeTypes = (types) => {
  const merged = mergeTypeDefs(types, {
    useSchemaDefinition: true,
    forceSchemaDefinition: true,
    throwOnConflict: true,
  });

  return print(merged);
};

export default mergeTypes;
