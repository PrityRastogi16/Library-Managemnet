const { UserModel } = require('../models/User');
const { BookModel } = require('../models/Book');
const bcrypt = require("bcrypt")
const resolvers = {
    Query: {
        getBooks: async () => await BookModel.find(),
        books: async (_, { userID }) => await BookModel.find({ userID })
    },
    Mutation: {
        signUpUser: async (_, {userNew }) => {
           const hashPass = await bcrypt.hash(userNew.password,5);
            const user = new UserModel({ ...userNew, password:hashPass });
            return await user.save();
            
        },
        // Add other mutation resolvers as needed
        
    }
};

module.exports = resolvers