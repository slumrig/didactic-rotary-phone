// Setup express app
const express = require('express')
const app = express()
// use text  middleware to parse request payloads into a string
app.use(express.text())

// Setup mongo db connection
const mongoose = require('mongoose')
require('dotenv').config()
const db = `mongodb://${process.env.TODO_DB_USER}:${process.env.TODO_DB_PASSWORD}@localhost:27017/${process.env.TODO_DB_NAME}`
mongoose.connect(db).then((dbo) => {
    console.log("DB connected")
}, (err) => {
    console.log(err)
})

// require the Todo model
const Todo = require('./models/Todo')

app.get('/api', async (req, res) => {
    const todos = await Todo.find()
    .catch(err => console.log(err))
    res.json({body: todos})
})

app.post('/api', async (req, res) => {
    const body = JSON.parse(req.body)

    const todo = new Todo({
        id: body.id,
        name: body.name,
        isComplete: false,
    })
    await todo.save()
    .catch(err => console.log(err))
    res.send(todo)
})

app.put('/api/:id', async (req, res) => {
    // put action will only update isComplete to true
    todo = await Todo.findOneAndUpdate({ id: req.params.id}, {isComplete: true}, {new: true})
    .catch(err => console.log(err))
    res.send(todo)
})

app.delete('/api/:id', async (req, res) => {
    await Todo.findOneAndDelete({ id: req.params.id})
    .catch(err => console.log(err))
    res.send('DELETE Request Called')
})

// App listening on configured port
app.listen(process.env.PORT, () => {
    console.log(`TODO app listening on port ${process.env.PORT}`)
})