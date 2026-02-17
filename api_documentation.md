# API Documentation

Base URL: \`http://localhost:4000\` (or configured PORT)

## Authentication

### Register
Create a new user account.

-   **URL**: \`/api/auth/register\`
-   **Method**: \`POST\`
-   **Headers**: \`Content-Type: application/json\`
-   **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```
-   **Success Response (201)**:
    ```json
    {
      "success": true,
      "message": "Account created successfully",
      "token": "eyJhbGciOiJIUzI1NiIsInR...",
      "user": {
        "id": "64f1b2c3e4b0a1a2b3c4d5e6",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
-   **Error Responses**:
    -   400: Missing fields or invalid email
    -   409: User already exists
    -   500: Server error

### Login
Authenticate an existing user.

-   **URL**: \`/api/auth/login\`
-   **Method**: \`POST\`
-   **Headers**: \`Content-Type: application/json\`
-   **Body**:
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```
-   **Success Response (200)**:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR...",
      "user": {
        "id": "64f1b2c3e4b0a1a2b3c4d5e6",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
-   **Error Responses**:
    -   400: Missing fields
    -   401: Invalid email or password
    -   500: Server error

## Results

**Note**: All result endpoints require the \`token\` header.
-   **Header**: \`token: <your_jwt_token>\`

### Create Result
Save a quiz result.

-   **URL**: \`/api/results\`
-   **Method**: \`POST\`
-   **Headers**:
    -   \`Content-Type: application/json\`
    -   \`token: <your_jwt_token>\`
-   **Body**:
    ```json
    {
      "title": "React Basics Quiz",
      "technology": "react",
      "level": "basic",
      "totalQuestion": 5,
      "correct": 4,
      "wrong": 1
    }
    ```
-   **Success Response (201)**:
    ```json
    {
      "success": true,
      "message": "Result Created",
      "result": {
        "user": "64f1b2c3e4b0a1a2b3c4d5e6",
        "title": "React Basics Quiz",
        "technology": "react",
        "level": "basic",
        "totalQuestions": 5,
        "correct": 4,
        "wrong": 1,
        "score": 80,
        "performance": "Good",
        "_id": "64f1c3d4e5b1a2b3c4d5e7f8",
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z",
        "__v": 0
      }
    }
    ```
-   **Error Responses**:
    -   401: Not authorised (missing/invalid token)
    -   400: Missing fields
    -   500: Server error

### List Results
Get a list of results for the authenticated user.

-   **URL**: \`/api/results\`
-   **Method**: \`GET\`
-   **Headers**: \`token: <your_jwt_token>\`
-   **Query Parameters** (Optional):
    -   \`technology\`: Filter by technology (e.g., \`?technology=react\`)
-   **Success Response (200)**:
    ```json
    {
      "success": true,
      "results": [
        {
          "_id": "64f1c3d4e5b1a2b3c4d5e7f8",
          "user": "64f1b2c3e4b0a1a2b3c4d5e6",
          "title": "React Basics Quiz",
          "technology": "react",
          "level": "basic",
          "totalQuestions": 5,
          "correct": 4,
          "wrong": 1,
          "score": 80,
          "performance": "Good",
          "createdAt": "2023-09-01T12:00:00.000Z",
          "updatedAt": "2023-09-01T12:00:00.000Z",
          "__v": 0
        }
      ]
    }
    ```
-   **Error Responses**:
    -   401: Not authorised
    -   500: Server error
