
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)
// 使用supertest包装Express应用(app)
// 创建一个可以发送HTTP请求的测试客户端
// 用于编写API测试

console.log('start!')


const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
]

// before(async () => {
//     console.log('Connecting to MongoDB...');
//     await mongoose.connect('mongodb+srv://fullstack:Lv710115@cluster0.biysl.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 5000, // 增加服务器选择超时时间
//     });
//     console.log('Connected to MongoDB');
// });

beforeEach(async () => {
    //数据库在开始时被清空，之后我们将存储在 initialNotes 数组中的两个笔记保存到数据库中。
    //这样做，我们确保数据库在每次测试运行前处于相同的状态。
    console.log('Clearing notes...');
    await Note.deleteMany({}).maxTimeMS(30000);
    console.log('Notes cleared.');
    let noteObject = new Note(initialNotes[0])
    console.log('First note saved.');
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
    console.log('Second note saved.');
})

test.only('notes are returned as json', async () => {
    //向 api/notes url 发出 HTTP GET 请求，并验证请求是否已使用状态代码 200 作出响应。
    //测试还验证 Content-Type 标头是否设置为 application/json，表示数据采用所需格式
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are two notes', async () => {
    const response = await api.get('/api/notes')
    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    // is the parameter truthy
    assert(contents.includes('HTML is easy'))
})

after(async () => {
    await mongoose.connection.close()
})
