# Fitnesso

This project is a web-based platform built using React that allows users to book appointments with yoga tutors and manage their schedules seamlessly. It supports user registration for both students and tutors, appointment booking, payments, and change avialbility, all connected to a robust backend for data management.

## Features

### User Roles

1. **Students**:

   - Register/login.
   - Browse and book yoga tutor appointments.
   - Make payments for bookings.
   - Change availability if needed.

### Functionality

- Secure login and signup system.
- Dynamic user role handling (Student).
- Appointment booking and payment.
- Payment gateway integration for seamless transactions.
- Backend support for data storage and retrieval.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Tools**:
  - Postman for API testing.

## Backend Details

### Backend Architecture
- **Node.js with Express.js**: Handles the API endpoints and server-side logic.
- **MongoDB**: Serves as the database for storing user data, appointments, and transactions.
- **JWT (JSON Web Token)**: Used for secure user authentication.
- **Middleware**:
  - Authentication middleware to protect routes.
  - Error-handling middleware for graceful error management.

### API Endpoints
1. **User Authentication**:
   - `POST /use/`: Register a new user (Student/Tutor).
   - `POST /user/login`: Login a user and generate a token.

2. **Update Profile**:
   - `GET /user/get-Profile`: Fetch user profile data.
   - `POST /user/update-profile`: update user profile.

### Database Schema
- **User Schema**:
  - Name, Email, Password

### Setup Instructions
- Ensure MongoDB is running locally or provide a remote connection string.
- Use Postman or a similar tool to test API endpoints during development.
- Add any additional backend dependencies using:
  ```bash
  npm install nodemon cors 
  ```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd yoga-tutor-booking
   ```

2. Install dependencies for the frontend:

   ```bash
   cd Exercise
   npm install
   ```

3. Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the `backend` folder.
   - Add the following:
     ```env
     MONGO_URI=<your_mongodb_connection_string>
     PORT=5000
     JWT_SECRET=<your_jwt_secret>
     PAYMENT_API_KEY=<your_payment_gateway_key>
     ```

5. Start the application:

   - Backend:
     ```bash
     cd backend
     nodemon server.js
     ```
   - Frontend:
     ```bash
     cd Exercise
     npm run dev
     ```

## Usage

- Navigate to `http://localhost:5173` to access the application.
- Register as a student to explore the platform.
- Use the dashboard to book appointments or manage your schedule.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.





