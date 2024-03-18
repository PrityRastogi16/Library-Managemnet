const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    booksOwned: [Book!]!  
}

type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    rentPrice: Float    
    buyPrice: Float
    status: String    
    owner: User   
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
        requestOTP(email: String!): String!
        login(userSignIn:SignInInput!): AuthPayload
        deleteBook(id:ID!):Book!
        updateBook(id:ID!, bookInput:BookInput):Book!
        logout: String!
        buyBook(bookId: ID!): Book!
        rentBook(bookId: ID!): Book! 
        returnBook(bookId: ID!): Book!
        
    }
    input BookInput {
        title: String!
        author: String!
        description: String!
        rentPrice: Float
        buyPrice: Float
        status: String   
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