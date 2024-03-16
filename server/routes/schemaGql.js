const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email:String!
    password:String!
}
    type Book {
        _id: ID!
        title: String!
        author: String!
    }
 
    type Query {
        getBooks: [Book]
        books(userID: ID!): [Book]
        
    }

    type Mutation {
        signUpUser(userNew: UserInput!): User
    }
    input UserInput{
        name: String!
         email: String!
          password: String!
    }
`;

module.exports = typeDefs