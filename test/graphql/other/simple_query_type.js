module.exports = `
  type Client {
    id: ID!
    name: String
    age: Int
  }

  type Query {
    clients: [Client]
  }
`;
