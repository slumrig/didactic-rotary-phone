const Todo = require('../models/todo.model')

module.exports.getAllTodos = async () => {
    const todos = await Todo.find({})
    return todos;
}

module.exports.insertTodo = async (todoDetails) => {
    try {
        const body = JSON.parse(todoDetails)

        const todo = new Todo({
            id: body.id,
            name: body.name,
            isComplete: false,
        })
        await todo.save()
        return todo;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports.updateTodo = async (id, todoDetails) => {
    const body = JSON.parse(todoDetails)
    const todo = await Todo.findOneAndUpdate({id: id}, {name: body.name, isComplete: body.isComplete})
    if (!todo) {
        throw new Error("Todo not found")
    }
    return todo;
}

module.exports.deleteTodo = async (id) => {
    try {
        const todo = await Todo.findOneAndDelete({id: id})
        return todo
    } catch (error) {
        throw new Error(error)
    }
}