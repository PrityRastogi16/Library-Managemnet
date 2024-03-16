const { UserModel } = require('../models/User');
const { BookModel } = require('../models/Book');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const resolvers = {
    Query: {
        getBooks: async () => await BookModel.find(),
        getUsers: async () => await UserModel.find()
    },
    Mutation: {
        signUpUser: async (_, {userNew }) => {
           const hashPass = await bcrypt.hash(userNew.password,5);
            const user = new UserModel({ ...userNew, password:hashPass });
            const newUser =  await user.save();
            return newUser;
                  
        },
        // Add other mutation resolvers as needed
        login: async (_,{userSignIn}) => {
            const user = await UserModel.findOne({email:userSignIn.email});
            if(!user){
                throw new Error("User Not Found");
            }
            const isPassCorrect = await bcrypt.compare(userSignIn.password, user.password);
            if(!isPassCorrect){
                throw new Error("Invalid Crediantials, Try again !")
            }
            const token = jwt.sign({userId: user.id},"prity")  
            return {token};
        },
    }
};



module.exports = resolvers