const chai = require('chai'); // eslint-disable-line
const validateSchema = require('../src/validate_schema');

const assert = chai.assert;

describe('validateSchema', () => {
  describe('with default options', () => {
    const validSchema = `schema {
      query: Query,
      mutation: Mutation
    }

    type Query {
       clients: [Client]
    }

    type Mutation {
       create_client(name: String!, age: Int!): Client
    }`;

    const validCustomTypes = [
      'type Client {\n    id: ID!\n    name: String\n    age: Int\n    products: [Product]\n  }',
    ];

    it('it throws error when schema is invalid', () => {
      const badSchema = `schema {
          query: Query,
          mutation: Mutation
        }

        type Query {
           clients:
        }

        type Mutation {
           create_client(name: String!, age: Int!): Client
        }`;

      assert.throws(() => validateSchema(badSchema, validCustomTypes), Error, 'Syntax Error GraphQL');
    });

    it('it throws error when a customType is invalid', () => {
      const badCustomTypes = [
        'type Client {\n    id: ID!\n    name:\n    age: Int\n    products: [Product]\n  }',
      ];

      assert.throws(() => validateSchema(validSchema, badCustomTypes), Error, 'Syntax Error GraphQL');
    });
  });
});
