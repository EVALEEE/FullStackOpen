import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
    console.log("start set new Token", token)
}


const getAll = () => {
    // return axios.get(baseUrl)
    console.log("start get all notes with axios")
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log("response data:", response.data)
        return response.data
    })
}

const create = async newObject => {
    console.log("start create note with axios")
    const config = {
        headers: { authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    // return axios.put(`${baseUrl}/${id}`, newObject)
    console.log("start update note with axios")
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}
