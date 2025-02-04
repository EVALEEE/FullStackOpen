
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const Note = require('../models/note')

const api = supertest(app)
// 使用supertest包装Express应用(app)
// 创建一个可以发送HTTP请求的测试客户端
// 用于编写API测试

console.log('start!')

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
    let noteObject = new Note(helper.initialNotes[0])
    console.log('First note saved.');
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
    console.log('Second note saved.');
})

test('notes are returned as json', async () => {
    //向 api/notes url 发出 HTTP GET 请求，并验证请求是否已使用状态代码 200 作出响应。
    //测试还验证 Content-Type 标头是否设置为 application/json，表示数据采用所需格式
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    // is the parameter truthy
    assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)

    assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const notesAtEnd = await helper.notesInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()

    const contents = notesAtEnd.map(r => r.content)
    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})
