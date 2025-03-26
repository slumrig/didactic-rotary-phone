# TODO App

A simple TODO application with a Node.js backend and a MongoDB database running in a Dockerized environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS)
- [npm](https://www.npmjs.com/)

## Configuration

1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Create a .env file (or rename .env.example to .env) in the backend directory and provide values for the following environment variables:
    ```bash
    TODO_DB_USER=user   
    TODO_DB_PASSWORD=password
    TODO_DB_NAME=todo_app
    TODO_DB_HOST=todo_db
    TODO_DB_PORT=27017
    TODO_APP_PORT=3001
    
- TODO_APP_PORT must be set to 3001 for this exercise.
- TODO_DB_PORT should be 27017 (default MongoDB port).
- Other values should be set based on your Dockerized environment.

## Running the App and MongoDB with Docker

Make sure you have Docker and Docker Compose installed.

1. Navigate to the backend directory:
    ```
    cd backend

2. Run containers:
    ```
    docker compose up --build
    
This starts the TODO app and MongoDB (you can run in background with --detach if you like).

3. Stop containers without removing them:
    ```
    docker compose stop

4. Stop and remove containters:
    ```
    docker compose down

With step 2 the TODO app should now be running, connected to the Dockerized MongoDB database, and listening on port 3001. You can verify that the app is running properly by navigating to localhost:3001/api and should see a json paylaod. Or you can try:
    ```
    curl --location 'http://localhost:3001/api'

## Running Tests
```
cd backend
npm install
npm test
```
This will execute the test suite using Jest.