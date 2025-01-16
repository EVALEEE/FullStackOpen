import React, { useState, useEffect } from 'react'
import './App.css'
// import { useState } from 'react'

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

// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course}</h1>
//     </div>
//   )
// }

// const Part = (props) => {
//   return (
//     <div>
//       <p>{props.part} {props.exercise}</p>
//     </div>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//       <p><Part part={props.part1} exercise={props.exercises1} /></p>
//       <p><Part part={props.part2} exercise={props.exercises2} /></p>
//       <p><Part part={props.part3} exercise={props.exercises3} /></p>
//     </div>
//   )
// }

// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
//     </div>
//   )
// }

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3}
//         exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
//       <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
//     </div>
//   )
// }

// ========================================

// Practice 1.3 & 1.4 & 1.5:

// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]

//   const Header = (props) => {
//     return (
//       <div>
//         <h1>{props.course}</h1>
//       </div>
//     )
//   }

//   const Content = (props) => {
//     return (
//       <div>
//         {props.parts.map((part, index) => (
//           <p key={index}>
//             {part.name} {part.exercises}
//           </p>
//         ))}
//       </div>
//     )
//   }

//   const Total = (props) => {
//     return (
//       <p>
//       {props.parts.map(prop => prop.exercises).reduce((a, b) => a + b, 0)}
//       </p>
//     )
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={parts} />
//       <Total parts={parts} />
//     </div>
//   )
// }

// ========================================

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

// 在这里，props 是一个对象，包含了 course 属性：
// props = {
//   course: {
//     name: 'Half Stack application development',
//     parts: [
//       { name: 'Fundamentals of React', exercises: 10 },
//       { name: 'Using props to pass data', exercises: 7 },
//       { name: 'State of a component', exercises: 14 }
//     ]
//   }
// }

// const Header = (props) => {
//   return (
//     console.log(props),
//     <div>
//       {console.log(props.course.name)}
//       <h1>{props.course.name}</h1>
//     </div>
//   )
// }

//   const Content = (props) => {
//     return (
//       <div>
//         {props.course.parts.map((part, index) => (
//           <p key={index}>
//             {part.name} {part.exercises}
//           </p>
//         ))}
//       </div>
//     )
//   }

//   const Total = (props) => {
//     return (
//       <p>
//         {props.course.parts.map(prop => prop.exercises).reduce((a, b) => a + b, 0)}
//       </p>
//     )
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   )
// }

// ========================================

// const Hello = ({ name, age }) => {// 解构赋值 终极
//   // const name = props.name
//   // const age = props.age
//  // const { name, age } = props // 解构赋值

//   // 在JavaScript中，在函数中定义函数是一种常规操作
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       {/* 这个人的年龄不需要作为参数传给函数，因为它可以直接访问传给组件的所有prop。 */}
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }


// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       {/* <Hello name="Maya" age={26} /> */}
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// ========================================

//Page re-rendering：
//我们想创建一个计数器，其值随着时间的推移或点击按钮而增加

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const reset = () => setCounter(0)

//   const Display = ({ counter }) => <div>{counter}</div>

//   const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text='plus' />
//       <Button onClick={decreaseByOne} text='minus' />
//       <Button onClick={reset} text='reset' />
//     </div>
//   )
// }

// ========================================


const History = (props) => {
  console.log(props)
  //History组件根据应用的状态渲染完全不同的React元素。这被称为条件渲染
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  //每一次点击都被存储在一个单独的状态中，名为allClicks，初始化为一个空数组
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    // 新的项目添加到数组中是通过concat方法完成的，
    // 该方法并不改变现有的数组，而是返回一个数组的新副本，并将项目添加到其中
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App