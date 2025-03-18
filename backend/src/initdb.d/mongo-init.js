db = db.getSiblingDB('todo_app')

db.createUser({
  user: process.env.TODO_DB_USER,
  pwd: process.env.TODO_DB_PASSWORD,
  roles: [{ role: 'readWrite', db: process.env.TODO_DB_NAME }],
})

db.createCollection('todos');

db.todos.insert([
  {
    id: 'df2c77ae-72c4-47ec-a214-1e5cb431bc44',
    name: 'Shopping',
    isComplete: false
  },
  {
    id: '2024a112-a66b-4dc2-9b3f-628ae8903316',
    name: 'Homework',
    isComplete: true
  }
])