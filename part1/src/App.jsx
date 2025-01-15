import React, { useState, useEffect } from 'react'
import './App.css'

// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20
//   return React.createElement(
//     'div',
//     null,
//     React.createElement(
//       'p', null, 'Hello world, it is ', now.toString()
//     ),
//     React.createElement(
//       'p', null, a, ' plus ', b, ' is ', a + b
//     )
//   )
// }

// ========================================

// const Hello = () => {
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

// const Cool = () => {
//   return (
//     <div>
//       <p>this is cool !!!</p>
//     </div>
//   )
// }

// const App = () => {
//   return (
//     <div>
//       <div>
//         <h1>Greetings</h1>
//         <Hello />
//       </div>
//       <div>
//         <Cool />
//       </div>
//     </div>
//   )
// }

// ========================================

const Hello = (props) => {
  const now = new Date()
  return (
    <div>
      <p>Hello {props.name} your age is {props.age} now is {now.toString()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <div>
        <h1>Greetings</h1>
        <Hello name="George" age={29 + 5} />
        <Hello name={name} age={age} />
      </div>
    </div>
  )
}

export default App
