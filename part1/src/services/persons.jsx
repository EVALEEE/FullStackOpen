import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'https://fso-exersice3-11-3-6-blue-darkness-8711.fly.dev/api/persons'
// const baseUrl = 'https://fso-phonebook-backend.vercel.app/api/persons'

// Add error handling
const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deletePerson,
    update
}