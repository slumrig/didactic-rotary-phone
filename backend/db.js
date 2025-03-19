const mongoose = require('mongoose')
require('dotenv').config()

const env = process.env

const connect_url = `mongodb://${env.TODO_DB_USER}:${env.TODO_DB_PASSWORD}@${env.TODO_DB_HOST}:${env.TODO_DB_PORT}/${process.env.TODO_DB_NAME}`
mongoose.connect(connect_url)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))