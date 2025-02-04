const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
// 使用supertest包装Express应用(app)
// 创建一个可以发送HTTP请求的测试客户端
// 用于编写API测试

test('notes are returned as json', async () => {
    //向 api/notes url 发出 HTTP GET 请求，并验证请求是否已使用状态代码 200 作出响应。
    //测试还验证 Content-Type 标头是否设置为 application/json，表示数据采用所需格式
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})