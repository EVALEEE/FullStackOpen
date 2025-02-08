
//路由器实际上是一个中间件，
//它可以用来在一个地方定义 "相关的路由"，它通常被放在自己的模块中。
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
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
    const body = request.body

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
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