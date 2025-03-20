const services = require('../services/todo.service')
const { fetchAllTodos, insertTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')

describe('Todo Controller', () => {
    let req, res

    beforeEach(() => {
        req = { body: {}, params: {} }  // Mock request object
        res = {
            status: jest.fn().mockReturnThis(), // Mock status chainability
            json: jest.fn(),
            send: jest.fn(),
            end: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks() // Reset mocks after each test
    })

    test('fetchAllTodos should return 200 and todos', async () => {
        const mockTodos = [{ id: '1', name: 'Test Todo', isComplete: false }]
        services.getAllTodos = jest.fn().mockResolvedValue(mockTodos)

        await fetchAllTodos(req, res)

        expect(services.getAllTodos).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ body: mockTodos })
    })

    test('insertTodo should return 200 and inserted todo', async () => {
        req.body = { name: 'New Todo' }
        const mockTodo = { id: '2', name: 'New Todo', isComplete: false }
        services.insertTodo = jest.fn().mockResolvedValue(mockTodo)

        await insertTodo(req, res)

        expect(services.insertTodo).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(JSON.stringify(mockTodo))
    })

    test('insertTodo should return 422 on error', async () => {
        req.body = { name: '' } // Invalid request
        services.insertTodo = jest.fn().mockRejectedValue(new Error('Validation failed'))

        await insertTodo(req, res)

        expect(services.insertTodo).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(422)
        expect(res.send).toHaveBeenCalledWith({ message: 'Validation failed' })
    })

    test('updateTodo should return 200 and updated todo', async () => {
        req.params.id = '3'
        req.body = { name: 'Updated Todo' }
        const mockUpdatedTodo = { id: '3', name: 'Updated Todo', isComplete: false }
        services.updateTodo = jest.fn().mockResolvedValue(mockUpdatedTodo)

        await updateTodo(req, res)

        expect(services.updateTodo).toHaveBeenCalledWith(req.params.id, req.body)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(JSON.stringify(mockUpdatedTodo))
    })

    test('deleteTodo should return 204', async () => {
        req.params.id = '4'
        services.deleteTodo = jest.fn().mockResolvedValue(null)

        await deleteTodo(req, res)

        expect(services.deleteTodo).toHaveBeenCalledWith(req.params.id)
        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.send).toHaveBeenCalled()
    })
})
