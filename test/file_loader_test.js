const chai = require('chai');
const path = require('path');
const fileLoader = require('../src/file_loader');
const clientType = require('./graphql/types/client_type');
const productType = require('./graphql/types/product_type');
const vendorType = require('./graphql/types/vendor_type');
const personEntityType = require('./graphql/types/person_entity_type');
const personSearchType = require('./graphql/types/person_search_type');

const assert = chai.assert;

describe('fileLoader', () => {
  describe('with default options', () => {
    it('loads all files from specified folder', () => {
      const types = [clientType, personEntityType, personSearchType, productType, vendorType];
      const loadedTypes = fileLoader(path.join(__dirname, 'graphql/types'));
      assert.deepEqual(loadedTypes, types);
    });
  });
});
