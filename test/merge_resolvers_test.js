const chai = require('chai');
const mergeResolvers = require('../src/merge_resolvers');
const clientResolvers = require('./graphql/resolvers/client_resolver');
const productResolvers = require('./graphql/resolvers/product_resolver');

const assert = chai.assert;

describe('mergeResolvers', () => {
  describe('with default options', () => {

    it('merges all query resolvers', () => {
      const resolvers = [clientResolvers, productResolvers];
      const mergedResolvers = mergeResolvers(resolvers);

      assert.isDefined(mergedResolvers.Query.clients, 'Merged resolvers is missing clients resolver');
      assert.isDefined(mergedResolvers.Query.client, 'Merged resolvers is missing client resolver');
      assert.isDefined(mergedResolvers.Query.products, 'Merged resolvers is missing products resolver');
      assert.isDefined(mergedResolvers.Query.product, 'Merged resolvers is missing product resolver');

    });

    it('merges all mutation resolvers', () => {
      const resolvers = [clientResolvers, productResolvers];
      const mergedResolvers = mergeResolvers(resolvers);

      assert.isDefined(mergedResolvers.Mutation.create_client, 'Merged resolvers is missing create_client resolver');
      assert.isDefined(mergedResolvers.Mutation.update_client, 'Merged resolvers is missing update_client resolver');
      assert.isDefined(mergedResolvers.Mutation.create_product, 'Merged resolvers is missing create_product resolver');
      assert.isDefined(mergedResolvers.Mutation.update_product, 'Merged resolvers is missing update_product resolver');

    });

    it('merges all subQuery resolvers', () => {
      const resolvers = [clientResolvers, productResolvers];
      const mergedResolvers = mergeResolvers(resolvers);

      assert.isDefined(mergedResolvers.Client.products, 'Merged resolvers is missing Client.products resolver');
      assert.isDefined(mergedResolvers.Product.clients, 'Merged resolvers is missing Product.clients resolver');

    });
  });
});
