const merge = require('deepmerge');

const mergeResolvers = resolvers => merge(...resolvers);

module.exports = mergeResolvers;
