const services = require('../services/todo.service')

/**
 * Fetches all todos from the database and returns them in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const fetchAllTodos = async (req, res) => {
    const todos = await services.getAllTodos()
    res.status(200)
    res.json({ body: todos })
}

/**
 * Inserts a new todo item into the database.
 *
 * @param {Object} req - The request object containing the todo data in the body.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const insertTodo = async (req, res) => {
    try {
        const todo = await services.insertTodo(req.body)
        res.status(200)
    } catch (error) {
        res.status(422).send({message: error.message})
    }
}

/**
 * Updates an existing todo item in the database.
 *
 * @param {Object} req - The request object containing the todo ID in params and updated data in the body.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await services.updateTodo(id, req.body)
        res.status(200)
    } catch (error) {
        res.status(204).send({message: error.message})
    }
}

/**
 * Deletes a todo item from the database.
 *
 * @param {Object} req - The request object containing the todo ID in params.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        await services.deleteTodo(id)
        res.status(200).send()
    } catch (error) {
        res.status(204).send({message: error.message})
    }
}

module.exports = {
    fetchAllTodos,
    insertTodo,
    updateTodo,
    deleteTodo,
}