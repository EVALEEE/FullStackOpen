import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    return axios.get(baseUrl)
    //这块先不改
}

const create = newObject => {
    //   return axios.post(baseUrl, newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    // return axios.put(`${baseUrl}/${id}`, newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    // 对象定义中冒号左边的标签是对象的键，而它右边的是在模块中定义的变量。
    // getAll: getAll,
    // create: create,
    // update: update
    // 由于键的名字和分配的变量是一样的，我们可以用更紧凑的语法来写对象定义。
    getAll,
    create,
    update
}
// 该模块返回一个对象，该对象有三个函数（getAll、create和update）作为其属性，处理笔记。这些函数直接返回axios方法所返回的 promise 。

