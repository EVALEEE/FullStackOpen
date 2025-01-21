import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseUrl)
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
    getAll: getAll,
    create: create,
    update: update
}
// 该模块返回一个对象，该对象有三个函数（getAll、create和update）作为其属性，处理笔记。这些函数直接返回axios方法所返回的 promise 。

