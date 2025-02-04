
// info用于打印正常的日志信息
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
    // console.log(...params)
}

// error用于打印错误信息
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
    // console.error(...params)
}

module.exports = {
    info, error
}