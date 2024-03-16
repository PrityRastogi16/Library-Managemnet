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
        async addBook(_, { bookInput},{user}) {
            // Check if user is logged in
            if (!user) {
              throw new Error("Unauthorized: User not logged in");
            }
      
            // Check if user has admin role
            if (user.role != "admin") {
              throw new Error("Unauthorized: User is not an admin");
            }
      
            // User is logged in and has admin role, so add book
            const { title, author, description } = bookInput;
            const newBook = new BookModel({
              title,
              author,
              description,
            });
            const savedBook = await newBook.save();
            return savedBook;
          },
          deleteBook: async (_, { id }, { user }) => {
            // Check if user is logged in
            if (!user) {
              throw new Error("Unauthorized: User not logged in");
            }
      
            // Check if user is admin
            if (user.role !== "admin") {
              throw new Error("Unauthorized: User is not an admin");
            }
      
            // User is logged in and is an admin, so delete book
            const deletedBook = await BookModel.findByIdAndDelete(id);
            if (!deletedBook) {
              throw new Error("Book not found");
            }
      
            return deletedBook;
          }
        }
};



module.exports = resolvers