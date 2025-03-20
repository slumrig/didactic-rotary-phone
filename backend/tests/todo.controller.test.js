const { fetchAllTodos, insertTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')
const services = require('../services/todo.service')

jest.mock('../services/todo.service') // Mock the service module

describe('Todo Controller', () => {
    let req, res

    beforeEach(() => {
        req = { body: {}, params: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        }
    })

    describe('fetchAllTodos', () => {
        it('should return 200 and all todos', async () => {
            const mockTodos = [{ id: '1', name: 'Test Todo', isComplete: false }]
            services.getAllTodos.mockResolvedValue(mockTodos)

            await fetchAllTodos(req, res)

            expect(services.getAllTodos).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ body: mockTodos })
        })
    })

    describe('insertTodo', () => {
        it('should return 200 on successful insertion', async () => {
            req.body = { id: '1', name: 'New Todo', isComplete: false }
            services.insertTodo.mockResolvedValue(req.body)

            await insertTodo(req, res)

            expect(services.insertTodo).toHaveBeenCalledWith(req.body)
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it('should return 422 on error', async () => {
            const errorMessage = 'Insertion failed'
            services.insertTodo.mockRejectedValue(new Error(errorMessage))

            await insertTodo(req, res)

            expect(services.insertTodo).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.send).toHaveBeenCalledWith({ message: errorMessage })
        })
    })

    describe('updateTodo', () => {
        it('should return 200 on successful update', async () => {
            req.params.id = '1'
            req.body = { name: 'Updated Todo', isComplete: true }
            services.updateTodo.mockResolvedValue(req.body)

            await updateTodo(req, res)

            expect(services.updateTodo).toHaveBeenCalledWith('1', req.body)
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it('should return 204 if update fails', async () => {
            const errorMessage = 'Update failed'
            services.updateTodo.mockRejectedValue(new Error(errorMessage))

            await updateTodo(req, res)

            expect(services.updateTodo).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(204)
            expect(res.send).toHaveBeenCalledWith({ message: errorMessage })
        })
    })

    describe('deleteTodo', () => {
        it('should return 200 on successful deletion', async () => {
            req.params.id = '1'
            services.deleteTodo.mockResolvedValue(true)

            await deleteTodo(req, res)

            expect(services.deleteTodo).toHaveBeenCalledWith('1')
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalled()
        })

        it('should return 204 if deletion fails', async () => {
            const errorMessage = 'Delete failed'
            services.deleteTodo.mockRejectedValue(new Error(errorMessage))

            await deleteTodo(req, res)

            expect(services.deleteTodo).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(204)
            expect(res.send).toHaveBeenCalledWith({ message: errorMessage })
        })
    })
})
