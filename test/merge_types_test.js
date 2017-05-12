const chai = require('chai'); // eslint-disable-line
const mergeTypes = require('../src/merge_types');
const clientType = require('./graphql/types/client_type');
const productType = require('./graphql/types/product_type');
const vendorType = require('./graphql/types/vendor_type');
const personEntityType = require('./graphql/types/person_entity_type');
const personSearchType = require('./graphql/types/person_search_type');
const customType = require('./graphql/other/custom_type');
const simpleQueryType = require('./graphql/other/simple_query_type');

const assert = chai.assert;

const normalizeWhitespace = str => str.replace(/\s+/g, ' ').trim();

describe('mergeTypes', () => {
  describe('when no types exist', () => {
    it('returns minimal schema', () => {
      const types = [];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        schema {
          query: Query
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.include(schema, expectedSchemaType, 'Merged Schema is missing schemaType');
    });

    it('returns empty query type', () => {
      const types = [];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Query {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is including empty query type');
    });

    it('returns no mutation type', () => {
      const types = [];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Mutation {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is including empty mutation type');
    });

    it('returns no subscription type', () => {
      const types = [];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Subscription {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is including empty subscription type');
    });
  });

  describe('when only query is specified', () => {
    it('returns minimal schema', () => {
      const types = [simpleQueryType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        schema {
          query: Query
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.include(schema, expectedSchemaType, 'Merged Schema is missing schemaType');
    });

    it('returns simple query type', () => {
      const types = [simpleQueryType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Query {
          clients: [Client]
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.include(schema, expectedSchemaType, 'Merged Schema is missing simple query type');
    });

    it('returns no mutation type', () => {
      const types = [simpleQueryType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Mutation {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged simple Schema is including empty mutation type');
    });

    it('returns no subscription type', () => {
      const types = [simpleQueryType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Subscription {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged simple Schema is including empty subscription type');
    });
  });

  describe('when only single custom type is passed', () => {
    it('includes customType', () => {
      const types = [customType];
      const mergedTypes = mergeTypes(types);

      const expectedCustomType = normalizeWhitespace(`
        type Custom {
          id: ID!
          name: String
          age: Int
        }
      `);

      const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

      assert.include(separateTypes, expectedCustomType, 'Merged Schema is missing customType');
    });

    it('returns minimal schema', () => {
      const types = [customType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        schema {
          query: Query
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.include(schema, expectedSchemaType, 'Merged Schema is missing schemaType');
    });

    it('returns empty query type', () => {
      const types = [customType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Query {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is missing empty query type');
    });

    it('returns no mutation type', () => {
      const types = [customType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Mutation {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is including empty mutation type');
    });

    it('returns no subscription type', () => {
      const types = [customType];
      const mergedTypes = mergeTypes(types);

      const expectedSchemaType = normalizeWhitespace(`
        type Subscription {
        }
      `);

      const schema = normalizeWhitespace(mergedTypes[0]);

      assert.notInclude(schema, expectedSchemaType, 'Merged Schema is including empty subscription type');
    });
  });

  it('includes schemaType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedSchemaType = normalizeWhitespace(`
      schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
      }
    `);

    const schema = normalizeWhitespace(mergedTypes[0]);

    assert.include(schema, expectedSchemaType, 'Merged Schema is missing schemaType');
  });

  it('includes queryType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedQueryType = normalizeWhitespace(`
      type Query {
        clients: [Client]
        client(id: ID!): Client
        products: [Product]
        product(id: ID!): Product
      }
    `);

    const schema = normalizeWhitespace(mergedTypes[0]);

    assert.include(schema, expectedQueryType, 'Merged Schema is missing queryType');
  });

  it('includes mutationType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedMutationType = normalizeWhitespace(`
      type Mutation {
        create_client(name: String!, age: Int!): Client
        update_client(id: ID!, name: String!, age: Int!): Client
        create_product(description: String!, price: Int!): Product
        update_product(id: ID!, description: String!, price: Int!): Product
      }`);


    const schema = normalizeWhitespace(mergedTypes[0]);

    assert.include(schema, expectedMutationType, 'Merged Schema is missing mutationType');
  });

  it('includes subscriptionType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedSubscriptionType = normalizeWhitespace(`
      type Subscription {
        activeClients: [Client]
        inactiveClients: [Client]
        activeProducts: [Product]
      }`);

    const schema = normalizeWhitespace(mergedTypes[0]);

    assert.include(schema, expectedSubscriptionType, 'Merged Schema is missing subscriptionType');
  });

  it('includes clientType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedClientType = normalizeWhitespace(`
      type Client {
        id: ID!
        name: String
        age: Int
        dob: Date
        settings: JSON
        products: [Product]
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedClientType, 'Merged Schema is missing clientType');
  });

  it('includes productType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedProductType = normalizeWhitespace(`
      type Product {
        id: ID!
        description: String
        price: Int
        tag: TAG
        clients: [Client]
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedProductType, 'Merged Schema is missing productType');
  });

  it('includes first inputType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedProductType = normalizeWhitespace(`
      input ClientForm {
        name: String!
        age: Int!
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedProductType, 'Merged Schema is missing first inputType');
  });

  it('includes second inputType', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedProductType = normalizeWhitespace(`
      input ClientAgeForm {
        age: Int!
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedProductType, 'Merged Schema is missing second inputType');
  });

  it('includes first product ENUM type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedEnumType = normalizeWhitespace(`
      enum ProductTypes {
        NEW
        USED
        REFURBISHED
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedEnumType, 'Merged Schema is missing first product ENUM type');
  });

  it('includes second product ENUM type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedEnumType = normalizeWhitespace(`
      enum ProductPriceType {
        REGULAR
        PROMOTION
        SALE
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedEnumType, 'Merged Schema is missing second product ENUM type');
  });

  it('includes first client ENUM type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedEnumType = normalizeWhitespace(`
      enum ClientStatus {
        NEW
        ACTIVE
        INACTIVE
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedEnumType, 'Merged Schema is missing first client ENUM type');
  });

  it('includes first client SCALAR type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      scalar Date
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing first client Scalar type');
  });

  it('includes second client SCALAR type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      scalar JSON
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing second client Scalar type');
  });

  it('includes first product SCALAR type', () => {
    const types = [clientType, productType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      scalar TAG
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing first product Scalar type');
  });

  it('includes INTERFACE type', () => {
    const types = [clientType, productType, vendorType, personEntityType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      interface PersonEntity {
          name: String
          age: Int
          dob: Date
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing INTERFACE type');
  });

  it('includes vendor custom type', () => {
    const types = [clientType, productType, vendorType, personEntityType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      type Vendor implements PersonEntity {
        id: ID!
        name: String
        age: Int
        dob: Date
      }
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing vendor custom type');
  });

  it('includes UNION type', () => {
    const types = [clientType, productType, vendorType, personEntityType, personSearchType];
    const mergedTypes = mergeTypes(types);

    const expectedScalarType = normalizeWhitespace(`
      union personSearch = Client | Vendor
    `);

    const separateTypes = mergedTypes.slice(1).map(type => normalizeWhitespace(type));

    assert.include(separateTypes, expectedScalarType, 'Merged Schema is missing UNION type');
  });
});
