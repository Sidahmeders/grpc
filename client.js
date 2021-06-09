const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('todo.proto', { })
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo('localhost:4000', grpc.credentials.createInsecure())

const text = process.argv[2]

client.createTodo({
    "id": -1,
    "text": text
}, (err, res) => {
    console.log("recieved from server CreateTodo: "+ JSON.stringify(res))
})

// client.readTodos({}, (err, res) => {
//     console.log("recieved from server ReadTodo: "+ JSON.stringify(res))
// })

const call = client.readTodosStream()
call.on('data', (item) => {
    console.log('recevied item from server readTodoStream: '+ JSON.stringify(item))
})
call.on('end', (e) => console.log("server done Streaming!"))