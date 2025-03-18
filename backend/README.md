# TODO App

## Configuration
1. Create a .env or rename example.env file in backend/src directory and provide values for the following environment variables (for this exercise PORT needs to be 3001)
```bash
TODO_DB_USER=
TODO_DB_PASSWORD=
TODO_DB_NAME=
PORT=
```
## Docker/MongoDB
To install docker compose: https://docs.docker.com/compose/install/linux/

```bash
cd backend/src

#run 
docker compose up
```

## Run Express App
```bash
cd backend/src

# build project
npm install

#run project
node todo.js