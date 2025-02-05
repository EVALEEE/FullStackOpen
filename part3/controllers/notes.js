
//路由器实际上是一个中间件，
//它可以用来在一个地方定义 "相关的路由"，它通常被放在自己的模块中。
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    // Note.find({}).then(notes => {
    //     response.json(notes)
    // })
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
    // Note.findById(request.params.id)
    //     .then(note => {
    //         if (note) {
    //             response.json(note)
    //         } else {
    //             response.status(404).end()
    //         }
    //     })
    //     .catch(error => next(error))

    // try {
    //     const note = await Note.findById(request.params.id)
    //     if (note) {
    //         response.json(note)
    //     } else {
    //         response.status(404).end()
    //     }
    // } catch (exception) {
    //     next(exception)
    // }

    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    // note.save()
    //     .then(savedNote => {
    //         response.status(201).json(savedNote)
    //     })
    //     .catch(error => next(error))

    // try {
    //     const savedNote = await note.save()
    //     response.status(201).json(savedNote)
    // } catch (exception) {
    //     next(exception)
    // }

    //使用了express-async-errors库，所以不需要try-catch块
    const savedNote = await note.save()
    response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
    // Note.findByIdAndDelete(request.params.id)
    //     .then(() => {
    //         response.status(204).end()
    //     })
    //     .catch(error => next(error))
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