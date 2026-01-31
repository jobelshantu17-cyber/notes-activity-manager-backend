# 📒 Notes & Daily Activity Manager (Backend)

A backend REST API built with Node.js, Express, MongoDB, and JWT authentication that allows users to securely manage personal notes and daily activities.

This project focuses on authentication, authorization, ownership-based access control, and date-based logic, following real-world backend development practices.


## 🚀 Features
🔐 Authentication & Security

User registration and login

Password hashing using bcrypt

JWT-based authentication

Protected routes using middleware

Ownership checks to prevent unauthorized access


📝 Notes Management

Create notes with headings and content

Fetch all notes (user-specific)

Update notes (only by owner)

Delete notes (only by owner)


📅 Daily Activity Manager

Create daily activities with date

Get today’s activities using date-range logic

Update activity status (pending / completed)

Delete activities (only by owner)


## 🧠 Key Concepts Implemented

RESTful API design

JWT authentication & middleware

Authorization & ownership validation

MongoDB + Mongoose data modeling

Date-based querying (start & end of day logic)

Clean folder structure & separation of concerns

Centralized error handling


## 🏗️ Project Structure

src/
├── config/        # Database configuration
├── controllers/  # Business logic
├── middleware/   # Authentication & error handling
├── models/       # Mongoose schemas
├── routes/       # API routes
├── utils/        # Helper utilities
├── app.js        # Express app setup
└── server.js     # Server entry point



## 🧩 API Endpoints

🔐 Auth

POST /api/auth/register – Register user

POST /api/auth/login – Login user

📝 Notes

POST /api/notes – Create note

GET /api/notes – Get all notes

PUT /api/notes/:noteId – Update note

DELETE /api/notes/:noteId – Delete note

📅 Activities

POST /api/activities – Create activity

GET /api/activities/today – Get today’s activities

PATCH /api/activities/:activityId/status – Update activity status

DELETE /api/activities/:activityId – Delete activity


## 🔑 Authentication Flow

User logs in and receives a JWT access token

Token is sent in request headers:

Authorization: Bearer <token>


Auth middleware verifies token

User ID is attached to req.user

Controllers use req.user.userId for authorization


## 🛡️ Authorization & Ownership

Users can only access their own notes and activities

Ownership is verified before update or delete operations

User ID is never trusted from the client


## 📅 Date-Based Logic (Daily Activities)

To fetch today’s activities:

Start of today: 00:00:00

End of today: 23:59:59

Activities are fetched using a date range query

This avoids incorrect comparisons caused by timestamps.

## 🛠️ Getting Started

1. Clone the repository  
2. Install dependencies  
npm install

3. Create a `.env` file with:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

4. Start the server:
npm run dev



## ⚙️ Tech Stack

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

bcrypt


## 🧪 Testing

APIs tested using Postman

All routes tested with valid and invalid tokens

Edge cases handled (unauthorized access, invalid input)


## 🎯 Learning Outcome

This project helped me understand:

Secure backend architecture

How authentication and authorization work together

How to design real-world REST APIs

How to debug backend issues step by step

How to structure a scalable backend project


## 📌 Future Improvements 

Refresh token implementation

Pagination for notes

Input validation middleware

Frontend integration


## 🙌 Author

Jobel Shantu
Backend Developer