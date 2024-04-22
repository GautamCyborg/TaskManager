# Task Management System

A simple task management system where users can create, update, and delete tasks. This project consists of both frontend and backend parts.

## Features

- **User Authentication:** Users can sign up and log in securely.
- **Create Task:** Users can create new tasks with a title, description, status, and priority.
- **View Tasks:** Users can view all their tasks.
- **Update Task:** Users can update task details, including title, description, status, and priority.
- **Delete Task:** Users can delete tasks they no longer need.
- **fileter Task:** filter 
- **Sort Task:**

## Technologies Used

### Frontend
- **React:** Frontend framework for building user interfaces.
- **React Router:** For handling navigation within the application.
- **Axios:** Promise-based HTTP client for making requests to the backend.
- **Tailwind CSS:** Utility-first CSS framework used for styling.
- **JWT:** JSON Web Tokens for user authentication.
- **Font Awesome:** For displaying icons in the application.

### Backend
- **Node.js:** JavaScript runtime for building server-side applications.
- **Express:** Web framework for Node.js used for building APIs.
- **MongoDB:** NoSQL database used for storing user and task data.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JWT:** JSON Web Tokens for user authentication.
- **bcryptjs:** Library for hashing passwords.
- **dotenv:** Library for loading environment variables from a .env file.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **cookie-parser:** Middleware for parsing cookies.

## Folder Structure

The project is organized as follows:

- **frontend/src:** Contains frontend code.
  - **components:** Contains reusable UI components.
  - **context:** Contains context provider for user authentication.
  - **pages:** Contains individual pages of the application.
  - **App.js:** Main component where routes are defined.
  - **index.js:** Entry point of the application.
- **backend:** Contains backend code.
  - **models:** Contains Mongoose models for User and Task.
  - **routes:** Contains route definitions for user authentication and task management.
  - **connection.js:** MongoDB connection setup.
  - **index.js:** Entry point of the backend.

## Frontend Setup

To run the frontend on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone <repository_url>
```

2.Navigate to the frontend directory:

```bash
cd frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm start
```
5. Open http://localhost:3000 to view it in the browser.

# Backend Setup

1.Navigate to the server directory:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```
3.Create a .env file in the root directory and specify the following variables:

PORT=5000
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>


4. Run the server:

```bash
node index.js
```
or

```bash
nodemon index.js
```

5. Open http://localhost:5000 to view it in the browser.


## API Endpoints

### Authentication

- **POST /auth/signup:** Sign up a new user.
  - *Request Body:* 
    ```json
    { "username": "example", "email": "example@example.com", "password": "examplepassword" }
    ```
  - *Response:* 
    ```json
    { "username": "example", "token": "<jwt_token>" }
    ```

- **POST /auth/login:** Log in an existing user.
  - *Request Body:* 
    ```json
    { "email": "example@example.com", "password": "examplepassword" }
    ```
  - *Response:* 
    ```json
    { "username": "example", "token": "<jwt_token>" }
    ```

- **GET /auth/validate:** Validate user's token.
  - *Response:* 
    ```json
    { "Status": true/false }
    ```

### Tasks

- **POST /createTask:** Create a new task.
  - *Request Body:* 
    ```json
    { "title": "Task Title", "description": "Task Description", "status": "Pending/Completed", "priority": 1/2/3, "userAssociated": "username" }
    ```
  - *Response:* New Task Object

- **GET /:username:** Get all tasks for a user.
  - *Response:* Array of Tasks

- **PUT /update/:id:** Update a task.
  - *Request Body:* 
    ```json
    { "title": "New Title", "description": "New Description", "status": "New Status", "priority": 1/2/3 }
    ```
  - *Response:* Updated Task Object

- **DELETE /delete/:id:** Delete a task.
  - *Response:* Deleted Task Object
