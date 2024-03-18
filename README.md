# Library Management System

Welcome to the Library Management System, a comprehensive solution for managing your library's resources efficiently. This system offers a wide range of features tailored to meet the needs of both users and administrators.

### Deployed link- https://library-managemnet.onrender.com/graphql
### Read Document to know more about queries: https://documenter.getpostman.com/view/31788909/2sA2xnxpqv
## Features

1. **User Authentication**
   - Signup: Users can create an account with OTP verification for added security.
   - Signin: Secure login functionality for registered users.
   - Logout: Users can securely logout from their accounts.

2. **Book Management**
   - Browse Books: Users can browse through the collection of available books.
   - Purchase Books: Users can purchase books from the library.
   - Rent Books: Users have the option to rent books for a specified duration.
   - Admin Operations: Administrators can create, update, and delete books from the library.

## User Guide

1. **Signup**
   - New users can register by providing their details and verifying their account using OTP sent to their email.

2. **Signin**
   - Registered users can sign in using their credentials.

3. **Logout**
   - Users can securely logout from their accounts to end their session.

4. **Book Operations**
   - Browse Books: Users can explore the collection of books available in the library.
   - Purchase Books: Users can buy books from the library by selecting the desired title and completing the purchase process.
   - Rent Books: Users can rent books for a specified period by selecting the book and duration of the rental.

5. **Admin Operations**
   - Create Book: Admins can add new books to the library, providing details such as title, author, description, and pricing information.
   - Update Book: Admins can modify existing book details, including title, author, description, and pricing.
   - Delete Book: Admins have the authority to remove books from the library if necessary.

## Get Started

#### Available Routes

**Queries**

- **books**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Retrieves a list of all books.
  - Authorization: Required
  - Example Query:
    ```graphql
    query {
      getbooks {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **users**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Retrieves a list of all users.
  - Authorization: Required
  - Example Query:
    ```graphql
    query {
      getusers {
        id
        username
        email
        password
        role
       status
      }
    }
    ```

**Mutations**

- **addBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Adds a new book to the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      addBook(bookInput: {
        title: "Book Title",
        author: "Author Name",
        description: "Book Description",
        rentPrice: 9.65,
        buyPrice: 199.44
      }) {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **deleteBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Deletes a book from the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      deleteBook(id: "book_id_here") {
        id
        title
        author
      }
    }
    ```

- **updateBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Updates a book in the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      updateBook(id: "book_id_here", edits: {
        title: "New Book Title",
        author: "New Author Name",
        description: "New Book Description",
        rentPrice: 6.99,
        buyPrice: 24.99,
        status: "Available"
      }) {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **buyBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to buy a book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      buyBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **rentBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to rent a book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      rentBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **returnBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to return a rented book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      returnBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **register**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Registers a new user.
  - Authorization: Not required
  - Example Mutation:
    ```graphql
    mutation {
      signUpUser(userInput: {
        name: "Prity",
        email: "prity@example.com",
        password: "password",
        role: "admin"
      }) {
        id
        username
        email
        role
      }
    }
    ```

- **login**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Logs in a user and generates access tokens.
  - Authorization: Not required
  - Example Mutation:
    ```graphql
    mutation {
      login(email: "john@example.com", password: "password") {
        token
        user {
          id
          name
          email
        }
      }
    }
    ```

- **logout**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Logs out a user by blacklisting access tokens.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      logout
    }
    ```

## Technology Stack

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **Apollo Server Express**: GraphQL server for Node.js.
- **MongoDB**: NoSQL database for data storage.
Thank you for choosing our platform!
