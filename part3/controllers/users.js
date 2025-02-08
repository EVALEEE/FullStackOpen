const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    //Mongoose的连接
    // const users = await User.find({}).populate('notes')
    //提供给 populate 方法的参数定义了在user文档的notes字段中
    //引用note对象的ids(id的复数)将被替换为被引用的note文档

    const users = await User
        .find({}).populate('notes', { content: 1})
    //使用populate参数来选择我们想从文档中包含的字段。
    //字段的选择是通过Mongo的语法完成的。

    response.json(users)
})

module.exports = usersRouter