
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The server should be running at `http://localhost:3001`.

## Usage

You can interact with the GraphQL API using a tool like [Postman](https://www.postman.com/) or [GraphQL Playground](https://www.graphql-playground.com/).

### GraphQL Endpoint

- **Endpoint:** `http://localhost:4000/graphql`

## GraphQL Schema

The schema defines the data structure, queries, and mutations available in the API. Here are the main types:

- **User**
- **Event**
- **Booking**
- **AuthData**

Refer to the [GraphQL Schema](#graphql-schema) section for detailed types and operations.

## Authentication

### Token Generation

1. **User Registration**

   To register a new user, send a mutation request to create a user:

   ```graphql
   mutation {
     createUser(userInput: {
       email: "user@example.com",
       password: "yourpassword"
     }) {
       _id
       email
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "createUser": {
         "_id": "605c72e3e5e12b001cdd2b1e",
         "email": "user@example.com"
       }
     }
   }
   ```

2. **User Login**

   To log in and generate a token, send a login mutation:

   ```graphql
   mutation {
     login(email: "user@example.com", password: "yourpassword") {
       userId
       token
       tokenExpiration
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "login": {
         "userId": "605c72e3e5e12b001cdd2b1e",
         "token": "your_jwt_token",
         "tokenExpiration": 1
       }
     }
   }
   ```

### Using the Token

- Include the token in the `Authorization` header for protected routes:

   ```plaintext
   Authorization: Bearer your_jwt_token
   ```

## API Endpoints

### Queries

1. **Get All Events**

   ```graphql
   {
     events {
       _id
       title
       description
       price
       date
       creator {
         _id
         email
       }
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "events": [
         {
           "_id": "605c72e3e5e12b001cdd2b1f",
           "title": "New Event",
           "description": "Event Description",
           "price": 30.0,
           "date": "2024-10-31T00:00:00.000Z",
           "creator": {
             "_id": "605c72e3e5e12b001cdd2b1e",
             "email": "user@example.com"
           }
         }
       ]
     }
   }
   ```

2. **Get All Bookings**

   ```graphql
   {
     bookings {
       _id
       event {
         _id
         title
       }
       user {
         _id
         email
       }
       createdAt
       updatedAt
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "bookings": [
         {
           "_id": "605c72e3e5e12b001cdd2b21",
           "event": {
             "_id": "605c72e3e5e12b001cdd2b1f",
             "title": "New Event"
           },
           "user": {
             "_id": "605c72e3e5e12b001cdd2b1e",
             "email": "user@example.com"
           },
           "createdAt": "2024-10-19T12:00:00.000Z",
           "updatedAt": "2024-10-19T12:00:00.000Z"
         }
       ]
     }
   }
   ```

### Mutations

1. **Create a New Event**

   ```graphql
   mutation {
     createEvent(eventInput: {
       title: "New Event",
       description: "Event Description",
       price: 30.0,
       date: "2024-10-31"
     }) {
       _id
       title
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "createEvent": {
         "_id": "605c72e3e5e12b001cdd2b1f",
         "title": "New Event"
       }
     }
   }
   ```

2. **Book an Event**

   ```graphql
   mutation {
     bookEvent(eventId: "605c72e3e5e12b001cdd2b1f") {
       _id
       event {
         _id
         title
       }
       user {
         _id
         email
       }
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "bookEvent": {
         "_id": "605c72e3e5e12b001cdd2b21",
         "event": {
           "_id": "605c72e3e5e12b001cdd2b1f",
           "title": "New Event"
         },
         "user": {
           "_id": "605c72e3e5e12b001cdd2b1e",
           "email": "user@example.com"
         }
       }
     }
   }
   ```

3. **Cancel a Booking**

   ```graphql
   mutation {
     cancelBooking(bookingId: "605c72e3e5e12b001cdd2b21") {
       _id
       title
     }
   }
   ```

   **Response:**
   ```json
   {
     "data": {
       "cancelBooking": {
         "_id": "605c72e3e5e12b001cdd2b1f",
         "title": "New Event"
       }
     }
   }
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Notes:
- Be sure to adjust the placeholder values like `yourusername` and `your_mongodb_connection_string` with your actual GitHub username and MongoDB connection string.
- The responses are based on the structure you provided in your code. Adjust the response fields to reflect any changes or specific data points relevant to your project.

