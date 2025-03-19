const request = require('supertest')
const app = require('../index')
const Todo = require('../models/todo.model')
const mongoose = require('mongoose')

beforeAll(async () => {
    // Connect to a test database
    const test_connection = `mongodb://${env.TODO_DB_USER}:${env.TODO_DB_PASSWORD}@${env.TODO_DB_HOST}:${env.TODO_DB_PORT}/testdb`
    await mongoose.connect(test_connection)
    .then(() => console.log('Test DB connected'))
    .catch(error => console.log(error))
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

describe('Backend API Tests', () => {
    let todoId = '6c86946b-41b1-4f88-becc-bdc989b12f9a'

    test('Should fetch all todos', async () => {
        const response = await request(app).get('/api')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test('Should create a new todo', async () => {
        const newTodo = { name: 'Test Todo', id: todoId }
        const response = await request(app).post('/api').send(newItem)
        expect(response.status).toBe(201)
        expect(response.body.name).toBe(newItem.name)
        expect(response.body.id).toBe(newItem.id)
        createdItemId = response.body._id
    })

    test('Should update an existing todo', async () => {
        const updatedItem = { name: 'Updated Item', id: todoId }
        const response = await request(app).put(`/api/${todoId}`).send(updatedItem)
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updatedItem.name)
    })

    test('Should delete a todo', async () => {
        const response = await request(app).delete(`/api/${todoId}`)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Item deleted successfully')
    })
})