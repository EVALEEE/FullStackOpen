
// const http = require('http')
// 应用导入了 Node 的内置 网络服务器 模块
require('dotenv').config()
// 通过调用 require('dotenv').config()，我们可以将环境变量从 .env 文件加载到 Node.js 的 process.env 对象中

const express = require('express')
const app = express()
// cors 中间件 使用 Node's cors 中间件来允许来自其他原点的请求
const cors = require('cors')

const Note = require('./models/note.js')

app.use(cors())
app.use(express.json()) // 为了方便地访问数据，我们需要 express json-parser 的帮助，它可以通过命令 app.use(express.json()) 来使用
//json-parser 的功能是将请求的 JSON 数据转化为 JavaScript 对象，然后在调用路由处理程序之前将其附加到 request 对象的 body 属性。



// 使用 http 模块的 createServer 方法来创建一个新的网络服务器
// 一个 事件处理程序 被注册到服务器上
// 每当 HTTP 请求被发送到服务器的地址 http://localhost:3001，该程序就会被调用
// const app = http.createServer((request, response) => {
//     // 该请求被响应，状态代码为 200
//     // Content-Type 的 application/json 值通知接收者，数据是 JSON 格式的
//     // 要返回的网站内容设置为 notes
//     response.writeHead(200, {'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })


//定义两个通往应用的 路径 
//第一个定义了一个事件处理程序，用来处理对应用 / 根的 HTTP GET 请求。
app.get('/', (request, response) => {
  //第一个 request 参数包含 HTTP 请求的所有信息
  //第二个 response 参数用于定义如何对请求进行响应。
  response.send('<h1>Hello World!</h1>')
  // 调用该方法使服务器响应 HTTP 请求，发送一个响应，其中包含传递给 send 方法的字符串
})


// 获取全部Notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

//根据id获取对应的Note
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  //如果next没有参数被调用，那么执行将简单地移动到下一个路由或中间件。
  //如果next函数带有参数被调用，那么执行将继续到错误处理中间件。
})


//创建新的Note
app.post('/api/notes', (request, response) => {
  console.log('Received POST request to /api/notes')  // 新增
  console.log('Request body:', request.body)  // 新增
  const body = request.body //如果没有 json-parser，body 属性将是未定义的

  if (body.content === undefined) {
    console.log('Content missing in request')  // 新增
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  console.log('Saving note:', note)

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => {
      console.error(error)
      response.status(500).json({ error: 'Error saving note' })
    })
})


//更新笔记
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //findByIdAndUpdate方法接收的是一个常规的JavaScript对象作为参数
  
  //默认情况下，事件处理器的updatedNote参数接收的是没有修改的原始文档。
  //我们添加了可选的{ new: true }参数，
  //这将导致我们的事件处理器被调用时，使用新的修改过的文档而不是原始文档。
    .then(updatedNote => {
      response.json(updatedNote)
      console.log('Updated note:', updatedNote)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)


// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})