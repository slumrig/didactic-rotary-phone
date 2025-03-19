const express = require('express')
const { fetchAllTodos, insertTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')
const router = express.Router()

router.get('/', fetchAllTodos)
router.post('/', insertTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

module.exports = router