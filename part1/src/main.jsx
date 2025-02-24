import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import cafeReducer from './reducers/cafeReducer'
import axios from 'axios'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'

// let counter = 1


// =================  note app  =================
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

const store = createStore(noteReducer)
//应用现在被定义为由react redux库提供的Provider-组件的一个子组件
//应用的存储被赋予给Provider，作为其属性
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}><App /></Provider>
)

// =================  cafe app  =================
// const store = createStore(cafeReducer)
// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//     root.render(<App store={store} />)
// }

// renderApp()
// store.subscribe(renderApp)











// const promise = axios.get('http://localhost:3001/notes')
// 我们想访问 promise 所代表的操作的结果，我们必须为 promise 注册一个事件处理程序。这可以通过then方法实现
// promise.then(response => {
//     console.log(response)
// })
//JavaScript运行环境调用由then方法注册的回调函数，为其提供一个response对象作为参数。
//response对象包含与HTTP GET请求的响应相关的所有基本数据，其中包括返回的数据、状态代码和头信息。

//将 promise 对象存储在一个变量中通常是不必要的，而通常是将then方法调用链到axios方法调用中，这样它就直接跟随它。
// axios
//     .get('http://localhost:3001/notes')
//     .then(response => {
//         const notes = response.data
//         console.log(notes)
//     })

//从本地服务器上请求笔记，并渲染它们，最初作为App组件。
//请注意，这种方法有很多问题，因为我们只有在成功检索到一个响应时才会渲染整个App组件
// axios.get('http://localhost:3001/notes').then(response => {
//     const notes = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
//   })



// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <App counter={counter} />
// )

// const refresh = () => {
//     ReactDOM.createRoot(document.getElementById('root')).render(
//         <App counter={counter} />
//     )
// }

// setInterval(() => {
//     refresh()
//     counter += 1
// }, 1000)

// const notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true,
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false,
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true,
//     },
//   ]

//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notes} />
//   )
