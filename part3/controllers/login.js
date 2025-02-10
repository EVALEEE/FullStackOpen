const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

require('dotenv').config()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    //令牌过期后，客户端应用需要获取新令牌。
    //通常，这是通过强制用户重新登录应用程序来实现的。
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )
    // console.log(token)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter