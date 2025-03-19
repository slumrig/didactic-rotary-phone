const services = require('../services/todo.service')

const fetchAllTodos = async (req, res) => {
    const todos = await services.getAllTodos()
    res.status(200)
    res.json({body: todos})
}

const insertTodo = async (req, res) => {
    try {
        await services.insertTodo(req.body)
        res.status(200)
        res.send(JSON.stringify(user))
    } catch(error) {
        res.status(422).send({message:error.message})
    }
}

const updateTodo = async (req, res) => {
    const {id} = req.params
    todo = await services.updateTodo(id, req.body)
    res.status(200)
    res.send(JSON.stringify(todo))
}

const deleteTodo = async (req, res) => {
    try {
        const {id} =  req.params
        await services.deleteTodo(id)
        res.status(204).send()
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    fetchAllTodos,
    insertTodo,
    updateTodo,
    deleteTodo,
}