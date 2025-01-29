
// const http = require('http')
// 应用导入了 Node 的内置 网络服务器 模块
require('dotenv').config()
// 通过调用 require('dotenv').config()，我们可以将环境变量从 .env 文件加载到 Node.js 的 process.env 对象中

const express = require('express')

// cors 中间件 使用 Node's cors 中间件来允许来自其他原点的请求
const cors = require('cors')
const app = express()//导入了 express，这次是一个 函数 ，用来创建一个存储在 app 变量中的 Express 应用
const Note = require('./models/note')

app.use(cors())
app.use(express.json()) // 为了方便地访问数据，我们需要 express json-parser 的帮助，它可以通过命令 app.use(express.json()) 来使用
//json-parser 的功能是将请求的 JSON 数据转化为 JavaScript 对象，然后在调用路由处理程序之前将其附加到 request 对象的 body 属性。


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 4,
        content: "test",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

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
//由于参数是一个字符串，Express 自动将 Content-Type 头的值设置为 text/html。响应的状态代码默认为 200



// GET 请求的路由
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})



//第二个路由定义了一个事件处理程序，处理向应用的 notes 路径发出的 HTTP GET 请求。
app.get('/api/notes/:id', (request, response) => {
    // 使用冒号语法为 Express 中的路由定义 参数化路由
    const id = request.params.id //id是一个字符串
    const note = notes.find(note => note.id === Number(id))
    // console.log(request.headers)
    // 如果没有找到笔记，服务器应该用状态代码 404 not found 来响应
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    // Express 自动将 Content-Type 头设置为 application/json 的适当值。
})


app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== Number(id))

    //如果删除资源是成功的，也就是说，笔记存在并且被删除了，我们用状态代码 204 无内容 来响应请求，并且在响应中不返回数据。
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body //如果没有 json-parser，body 属性将是未定义的

    // 通过定义 content 属性不得为空来改进这个应用
    if (!body.content) {
        // 如果收到的数据缺少 content 属性的值，服务器将以状态代码 400 bad request 响应请求。
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(), //date 属性的生成是由服务器完成的
        id: generateId(),
    }

    notes = notes.concat(note)

    console.log(note)
    response.json(note)
})


//绑定了分配给 app 变量的 http 服务器，以监听发送到 3001 端口的 HTTP 请求。
// const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})