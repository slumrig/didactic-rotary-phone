const Todo = require('../models/todo.model')

/**
 * Retrieves all todos from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of todos.
 */
module.exports.getAllTodos = async () => {
    const todos = await Todo.find({})
    return todos
}

/**
 * Inserts a new todo into the database.
 *
 * @param {string} todoDetails - The JSON string containing the new todo details.
 * @returns {Promise<Object>} A promise that resolves to the created todo object.
 * @throws {Error} If an error occurs while parsing or saving the todo.
 */
module.exports.insertTodo = async (todoDetails) => {
    try {
        const body = JSON.parse(todoDetails)

        const todo = new Todo({
            id: body.id,
            name: body.name,
            isComplete: false,
        })
        await todo.save()
        return todo
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

/**
 * Updates an existing todo in the database.
 *
 * @param {string} id - The ID of the todo to update.
 * @param {string} todoDetails - The JSON string containing the updated todo details.
 * @returns {Promise<Object>} A promise that resolves to the updated todo object.
 * @throws {Error} If the todo is not found.
 */
module.exports.updateTodo = async (id, todoDetails) => {
    const body = JSON.parse(todoDetails)
    const todo = await Todo.findOneAndUpdate(
        { id: id },
        { name: body.name, isComplete: body.isComplete }
    )
    if (!todo) {
        throw new Error('Todo not found')
    }
    return todo
}

/**
 * Deletes a todo from the database.
 *
 * @param {string} id - The ID of the todo to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the deleted todo object or null if not found.
 * @throws {Error} If an error occurs while deleting the todo.
 */
module.exports.deleteTodo = async (id) => {
    try {
        const todo = await Todo.findOneAndDelete({ id: id })
        return todo
    } catch (error) {
        throw new Error(error)
    }
}