const express = require('express');
const { connectDB } = require("./utils/dbConnect");
const { ApolloServer, gql } = require("apollo-server-express");
const bodyParser = require('body-parser');
const typeDefs = require("./routes/schemaGql")
const resolvers = require("./routes/resolver")
const {UserModel} = require("./models/User");
const cors = require('cors');
const {expressMiddleware} = require('@apollo/server/express4');
const { default: axios } = require('axios');
const jwt = require("jsonwebtoken");

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers,
    context: async({ req }) => {
        // Extract token from request headers
        const token = req.headers.authorization || "";
        let user = null;
        try {
          const decodedToken = jwt.verify(token, "prity");
          const userId = decodedToken.userId;
          user = await UserModel.findById(userId);
        } catch (error) {
          console.error("Error decoding token:", error.message);
        }
        return { user };
      }
});

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