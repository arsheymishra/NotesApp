# Notes App

A full-stack Notes application with user authentication and CRUD functionality for managing personal notes.

## Features

- User authentication (signup/login)
- Create, read, update, and delete notes
- Responsive design with Tailwind CSS
- Authentication with JWT

## Tech Stack

### Frontend
- React
- React Router
- Axios for API calls
- Tailwind CSS for styling

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL/MySQL

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Database (PostgreSQL/MySQL)

### Backend Setup
1. Navigate to the Backend directory: `cd Backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your database connection string and JWT secret:
   ```
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```
4. Run database migrations: `npx prisma migrate dev`
5. Start the server: `npm start`

### Frontend Setup
1. Navigate to the Frontend directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Log in a user

### Notes
- GET `/api/notes` - Get all notes for the authenticated user
- POST `/api/notes` - Create a new note
- PUT `/api/notes/:id` - Update a note
- DELETE `/api/notes/:id` - Delete a note

## License
MIT 