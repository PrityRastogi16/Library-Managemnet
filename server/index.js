const express = require('express');
const { connectDB } = require("./utils/dbConnect");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require('body-parser');
const { UserModel } = require('./models/User');
const { BookModel } = require('./models/Book');
const typeDefs = require("./routes/schemaGql")
const resolvers = require("./routes/resolver")
const cors = require('cors');
const {userRouter} = require("./routes/userRoutes")
const {bookRouter} = require("./routes/bookRoutes");
const {expressMiddleware} = require('@apollo/server/express4');
const { default: axios } = require('axios');
// Define your GraphQL schema
// const typeDefs = gql`
// type User {
//     _id: ID!
//     name: String!
//     email:String!
//     password:String!
// }
//     type Book {
//         _id: ID!
//         title: String!
//         author: String!
//     }
 
//     type Query {
//         getBooks: [Book]
//         books(userID: ID!): [Book]
        
//     }

//     type Mutation {
//         createUser(name: String!, email: String!, password: String!): User
//     }
// `;

// Define your resolver functions
// const resolvers = {
//     Query: {
//         getBooks: async () => await BookModel.find(),
//         books: async (_, { userID }) => await BookModel.find({ userID })
//     },
//     Mutation: {
//         createUser: async (_, { name, email, password }) => {
//             const user = new UserModel({ name, email, password });
//             await user.save();
//             return user;
//         },
//         // Add other mutation resolvers as needed
        
//     }
// };

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers});

// Create Express application
const app=express();
// await server.applyMiddleware({ app });
app.use(express.json());

// Apply Apollo middleware
async function applyApolloMiddleware() {
    await server.start();
    server.applyMiddleware({ app });
}

// Apply Express middleware and start the server
async function startServer() {
    await applyApolloMiddleware();
    app.use('/users', userRouter);
    app.use('/books', bookRouter);
    app.use('/graphql',expressMiddleware(server));
    
    app.listen(2000, async () => {
        try {
            await connectDB;
            console.log("Connected to db");
            console.log("Server is running at port 2000");
        } catch (err) {
            console.error(err);
        }
    });
}

startServer();