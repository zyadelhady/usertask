# User Management API

This is a simple RESTful API for managing users, built with NestJS and MongoDB.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd usertask/nestjs-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `nestjs-app` directory and add the following:

    ```
    MONGODB_URI=your-mongodb-connection-string
    PORT=3000
    ```

    Replace `your-mongodb-connection-string` with your actual MongoDB connection string (e.g., `mongodb://localhost:27017/usertask`).

4.  **Run the application:**
    ```bash
    npm run start:dev
    ```

The application will be running at `http://localhost:3000`.

## Running with Docker

Alternatively, you can run the application using Docker and Docker Compose:

1.  **Build and run the Docker containers:**

    ```bash
    docker-compose up --build
    ```

    This will build the NestJS application image and start both the application and MongoDB containers.

2.  **Access the application:**

    The application will be available at `http://localhost:3000` (or the port you configured in your `.env` file).


## API Endpoints

### Create User

- **POST** `/users`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john.doe@example.com","age":30}'
  ```

### Get All Users

- **GET** `/users`
- **cURL Example:**
  ```bash
  curl http://localhost:3000/users
  ```

### Get User by ID

- **GET** `/users/:id`
- **cURL Example:**
  ```bash
  curl http://localhost:3000/users/your-user-id
  ```

### Update User

- **PATCH** `/users/:id`
- **Body (partial update):**
  ```json
  {
    "age": 31
  }
  ```
- **cURL Example:**
  ```bash
  curl -X PATCH http://localhost:3000/users/your-user-id -H "Content-Type: application/json" -d '{"age":31}'
  ```

### Delete User

- **DELETE** `/users/:id`
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:3000/users/your-user-id
  ```
