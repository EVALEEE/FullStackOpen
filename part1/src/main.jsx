import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'

// let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
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
