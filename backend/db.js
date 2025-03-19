const mongoose = require('mongoose')
require('dotenv').config()

const connect_url = `mongodb://${process.env.TODO_DB_USER}:${process.env.TODO_DB_PASSWORD}@localhost:27017/${process.env.TODO_DB_NAME}`

mongoose.connect(connect_url)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))