const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email:String!
    password:String!
    role: String!
}
    type Book {
        _id: ID!
        title: String!
        author: String!
        description:String!
    }
    type AuthPayload {
        token: String!
    }
 
    type Query {
        getBooks: [Book]!
        getUsers: [User]!  
    }

    type Mutation {
        signUpUser(userNew: UserInput!): User
        addBook(bookInput: BookInput): Book!
        login(userSignIn:SignInInput!): AuthPayload
        deleteBook(id:ID!):Book!
    }
    input BookInput {
        title: String!
        author: String!
        description: String!
    }
    
    input UserInput{
        name: String!
         email: String!
          password: String!
          role:String
    }
    input SignInInput{
         email: String!
          password: String!
    }
`;

module.exports = typeDefs