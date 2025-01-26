
const http = require('http')
// 应用导入了 Node 的内置 网络服务器 模块

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
    }
  ]

// 使用 http 模块的 createServer 方法来创建一个新的网络服务器
// 一个 事件处理程序 被注册到服务器上
// 每当 HTTP 请求被发送到服务器的地址 http://localhost:3001，该程序就会被调用
const app = http.createServer((request, response) => {
    // 该请求被响应，状态代码为 200
    // Content-Type 的 application/json 值通知接收者，数据是 JSON 格式的
    // 要返回的网站内容设置为 notes
    response.writeHead(200, {'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

//绑定了分配给 app 变量的 http 服务器，以监听发送到 3001 端口的 HTTP 请求。
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)