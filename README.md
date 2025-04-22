# Assignment App

## Description
This is a Node.js and Express-based application that includes MongoDB for data storage. The application is built using TypeScript and follows best practices for API development.

## Features
- User authentication with JWT
- API request validation using Joi
- Secure password handling with bcrypt
- File uploads using Multer
- CORS support for cross-origin requests
- Logging with Winston and Daily Rotate File
- Environment variable management using dotenv

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **TypeScript**
- **JWT Authentication**
- **Winston Logging**
- **Multer for File Uploads**

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/DeepeshC612/Assignment-Backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd assignment-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application
To start the development server:
```sh
npm start
```

To build the project:
```sh
npm run build
```

To run the built version:
```sh
npm run dev
```

## Folder Structure
```
assignment-app/
│── src/
│   ├── configs/          # Database configuration
│   ├── controllers/      # API controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── utils/            # Utility functions
│   ├── uploads/          # Uploaded files storage
│   ├── validator/        # Request validation
│   ├── index.ts          # Main entry point
│── .env                  # Environment variables
│── package.json          # Project dependencies
│── tsconfig.json         # TypeScript configuration
```

## API Endpoints
### Authentication
- **POST /auth/signup** - Register a new user
- **POST /auth/login** - User login

### Books
- **GET /books** - Get all Books
- **POST /books** - Add a new book
- **GET /books/:id** - Get a book
- **PUT /books/:id** - Update a book
- **DELETE /books/:id** - Delete a book

## Logging
This application uses Winston for logging. Logs are stored and rotated daily in `logs/`.

## License
This project is licensed under the MIT License.

