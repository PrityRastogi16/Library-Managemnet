const { UserModel } = require('../models/User');
const { BookModel } = require('../models/Book');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {RedisClient} = require("../controllers/redis.middleware");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'prityss7991@gmail.com',
        pass: 'ralg llmu ncil dkbj',
    },
});

// Function to generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

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
        // REQUEST OTP
        requestOTP: async (_, {email}) => {
          // Generate OTP
          const otp = generateOTP();
          RedisClient.setex("otp",3600, otp);

          // Send OTP via email
          try {
              await transporter.sendMail({
                  from: 'prityss7991@gmail.com',
                  to: email,
                  subject: 'OTP for Authentication',
                  text: `Your OTP is: ${otp}`,
              });
              return 'OTP sent successfully';
          } catch (error) {
              console.error("Error sending OTP:", error.message);
              throw new Error('Failed to send OTP');
          }
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
            RedisClient.setex("key", 3600, token); 
            RedisClient.get("key", (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.log(result); // Prints "value"
              }
            });
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
            const { title, author, description, rentPrice, buyPrice  } = bookInput;
            const newBook = new BookModel({
              title,
              author,
              description,
              rentPrice,
              buyPrice
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
          },
          updateBook: async (_, { id,bookInput }, { user }) => {
            // Check if user is logged in
            if (!user) {
              throw new Error("Unauthorized: User not logged in");
          }
          
          // Check if user is admin
          if (user.role !== "admin") {
              throw new Error("Unauthorized: User is not an admin");
          }

          try {
              // Find the book by ID and update it with the new data
              const updatedBook = await BookModel.findByIdAndUpdate(
                  id,
                  { $set: bookInput },
                  { new: true } // Return the updated document
              );

              if (!updatedBook) {
                  throw new Error("Book not found");
              }

              return updatedBook;
          } catch (error) {
              console.error("Error updating book:", error.message);
              throw new Error("Failed to update book");
          }
      },
      logout: async (_, __, { user }) => {
        // Check if the user is authenticated
        if (!user) {
            throw new Error("Unauthorized: User Already Logged Out");
        }
        // Clear token from Redis
        RedisClient.del(token);
        // Perform any other necessary logout actions
        return `User ${user.name} has been logged out`;
           },

          //  Rent or Buy Books
          rentBook: async (_, { id }, { user }) => {
            if (!user) {
              throw new Error("Unauthorized: User not logged in");
            }
      
            try {
              const book = await BookModel.findById(id);
              if (!book) {
                throw new Error("Book not found");
              }
              user.booksOwned.push(book);
              await user.save();
      
              return book;
            } catch (error) {
              console.error("Error renting book:", error.message);
              throw new Error("Failed to rent book");
            }
          },
          buyBook: async (_, { id }, { user }) => {
            if (!user) {
              throw new Error("Unauthorized: User not logged in");
            }
      
            try {
              // Find the book by ID
              const book = await BookModel.findById(id);
              if (!book) {
                throw new Error("Book not found");
              }
              user.booksOwned.push(book);
              await user.save();
      
              return book;
            } catch (error) {
              console.error("Error buying book:", error.message);
              throw new Error("Failed to buy book");
            }
          }, 
      
        }
};



module.exports = resolvers