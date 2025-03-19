// Setup express app
const express = require('express')
const app = express()
// use text  middleware to parse request payloads into a string
app.use(express.text())

const TodoRoutes = require('./routes/todo.route')

const db = require('./db')

app.use('/api', TodoRoutes)

// App listening on configured port
app.listen(process.env.PORT, () => {
    console.log(`TODO app listening on port ${process.env.PORT}`)
})