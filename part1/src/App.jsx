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

// const Footer = () => {
//   return (
//     <div>
//       Greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
//     </div>
//   )
// }

// const Hello = (props) => {
//   const now = new Date()
//   return (
//     <div>
//       <p>Hello {props.name} your age is {props.age} now is {now.toString()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10
//   console.log(name)
// return (
// React组件的内容（通常）需要包含一个根元素 
//   <div>
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="George" age={29 + 5} />
//       <Hello name={name} age={age} />
//     </div>
//   </div>
// )
// 使用根元素并不是唯一可行的选择。一个组件的array也是一个有效的解决方案。
// return [
//   <h1>Greetings</h1>,
//   <Hello name="Maya" age={26 + 10} />,
//   <Footer />
// ]

// 然而，定义应用的根元素时，不是一个特别明智的做法，它使代码看起来有点难看。
// 由于根元素被强制规定了，我们在DOM树中有 "额外的 "div-elements。
// 这可以通过使用fragments来避免，即用一个空元素来包装组件要返回的元素。
//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//       <Footer />
//     </>
//   )
//   // 这样由React生成的DOM也不再包含额外的div元素
// }

// ========================================

// Practice 1.1 & 1.2:

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p><Part part={props.part1} exercise={props.exercises1} /></p>
      <p><Part part={props.part2} exercise={props.exercises2} /></p>
      <p><Part part={props.part3} exercise={props.exercises3} /></p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}
        exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
