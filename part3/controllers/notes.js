
//路由器实际上是一个中间件，
//它可以用来在一个地方定义 "相关的路由"，它通常被放在自己的模块中。
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//辅助函数getTokenFrom将token从authorization头部分离出来
const getTokenFrom = request => {
    console.log("start get token from request...")
    const authorization = request.get('authorization')
    console.log("authorization", authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
        console.log("have authorization")
        return authorization.replace('Bearer ', '')
    }
    return null
}

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', async (request, response) => {
    console.log("start post note")
    const body = request.body
    console.log("body", body)

    console.log("start decode token...")
    //jwt.verify检查token的有效性。该方法还解码token，或返回token基于的对象
    //从token解码的对象包含username和id字段
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    console.log("decodedToken:", decodedToken)

    if (!decodedToken.id) {
        //从token解码的对象不包含用户的身份
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        user: user._id
    })

    //使用了express-async-errors库，所以不需要try-catch块
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)
})

//该模块导出了路由器
module.exports = notesRouter