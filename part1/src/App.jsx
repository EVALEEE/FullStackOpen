import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Note from './components/Note.jsx'
import Course from './components/Course.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import noteService from './services/notes'

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

//   const Display = (props) => <div>{props.counter}</div>

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const reset = () => setCounter(0)

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

// const History = (props) => {
//   console.log('props value is', props)
//   //History组件根据应用的状态渲染完全不同的React元素。这被称为条件渲染
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   // 钩子只能从定义了React组件的函数体内部调用,不能从循环、条件表达式或任何不是定义组件的函数的地方调用
//   // 这样做是为了确保钩子总是以相同的顺序被调用，如果不是这样的话，应用将表现得不正常

//   //每一次点击都被存储在一个单独的状态中，名为allClicks，初始化为一个空数组
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     // 新的项目添加到数组中是通过concat方法完成的，
//     // 该方法并不改变现有的数组，而是返回一个数组的新副本，并将项目添加到其中
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

// ========================================

// 一个事件处理程序不能是对一个函数的调用，它必须是一个函数或对一个函数的引用
// const App = () => {
//   const [value, setValue] = useState(10)

//   const setToValue = (newValue) => {
//     console.log('value now', newValue)
//     setValue(newValue)
//   }

//   return (
//     <div>
//       {value}
//       <button onClick={() => setToValue(1000)}>
//         thousand
//       </button>
//       <button onClick={() => setToValue(0)}>
//         reset
//       </button>
//       <button onClick={() => setToValue(value + 1)}>
//         increment
//       </button>
//     </div>
//   )
// }

// ========================================
// Practice 1.6 - 1.14:
//像大多数公司一样，Unicafe从其客户那里收集反馈。你的任务是实现一个收集客户反馈的网络应用。
// 反馈只有三个选项。好，中立，和坏。
//应用必须显示每个类别收集到的反馈的总数。

// const Statistics = ({ good, bad, neutral }) => {
//   if (good === 0 && neutral === 0 && bad === 0) {
//     return (
//       <div>
//         <h1>Statistics</h1>
//         <p>No feedback given</p>
//       </div>
//     )
//   }
//   return (
//     <div>
//       <h1>Statistics</h1>
//       <div>
//         <table>
//           <tbody>
//             <StatisticLine text='good' value={good} />
//             <StatisticLine text='neutral' value={neutral} />
//             <StatisticLine text='bad' value={bad} />
//             <StatisticLine text='all' value={good + neutral + bad} />
//             <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
//             <StatisticLine text='positive' value={good / (good + neutral + bad) * 100 + '%'} />
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const StatisticLine = ({ text, value }) => {
//   return (
//     <tr>
//       <td>{text}</td>
//       <td>{value}</td>
//     </tr>
//   )
// }

// const App = ({ notes }) => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const anecdotes = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
//   ]

//   const [selected, setSelected] = useState(0)
//   const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0])
//   console.log(counts)

//   const handleGoodClick = () => {
//     setGood(good + 1)
//   }

//   const handleNeutralClick = () => {
//     setNeutral(neutral + 1)
//   }

//   const handleBadClick = () => {
//     setBad(bad + 1)
//   }

//   //该按钮可以被点击来显示一个随机软件工程领域的名言警句
//   const handleNextClick = () => {
//     setSelected(Math.floor(Math.random() * anecdotes.length))
//   }

//   const handleVote = () => {
//     const copy = [...counts]
//     copy[selected] += 1
//     setCounts(copy)
//     console.log(counts)
//   }

//   //扩展你的应用，使其显示更多关于收集到的反馈的统计数据：收集到的反馈总数、平均分数（好：1，中性：0，坏：-1）和积极反馈的百分比。
//   return (
//     <div>
//       <h1>Give Feedback</h1>
//       <div className="button-container">
//         <Button handleClick={handleGoodClick} text='good' />
//         <Button handleClick={handleNeutralClick} text='neutral' />
//         <Button handleClick={handleBadClick} text='bad' />
//       </div>
//       <div>
//         <Statistics good={good} neutral={neutral} bad={bad} />
//       </div>
//       <div className='card'>
//         "{anecdotes[selected]}"
//       </div>
//       <div>
//         <p>has {counts[selected]} votes</p>
//       </div>
//       <div className="button-container">
//         <Button handleClick={handleNextClick} text='anecdotes' />
//         <Button handleClick={handleVote} text='vote' />
//       </div>
//       <div>
//         {/* 显示拥有最大票数的名言警句 */}
//         <h1>Anecdote with most votes</h1>
//         <p>{anecdotes[counts.indexOf(Math.max(...counts))]}</p>
//       </div>
//     </div>
//   )
// }

// ========================================

//Exercises 2.1.-2.5
// const App = () => {
// const course = {
//   id: 1,
//   name: 'Half Stack application development',
//   parts: [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10,
//       id: 1
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7,
//       id: 2
//     },
//     {
//       name: 'State of a component',
//       exercises: 14,
//       id: 3
//     }
//   ]
// }
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     },
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     },
//     {
//       name: 'Express.js',
//       id: 3,
//       parts: [
//         {
//           name: 'Express.js',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]
//   // 定义一个负责格式化单一课程的组件，称为Course
//   return <Course courses={courses} />
// }

// ========================================

//为了让我们的页面在添加新的笔记时得到更新，最好将笔记存储在App组件的状态中。
//让我们导入useState函数，用它来定义一块状态，用prop中传递的初始笔记数组进行初始化。
// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)

const App = () => {
  const [notes, setNotes] = useState([])
  //添加一个新的状态，叫做newNote，用来存储用户提交的输入，让我们把它设置为input元素的value属性
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)//在App组件中添加一个状态，跟踪哪些笔记应该被显示


  //默认情况下，效果会在每次完成渲染后运行，但你可以选择只在某些值发生变化时启动它。
  useEffect(() => {
    // 该函数在渲染完组建之后运行
    // 执行结果是effect被打印到控制台，命令axios.get开始从服务器获取数据，
    // 并注册 response=> 函数作为该操作的event handler
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        // 当数据从服务器到达时，JavaScript运行时调用注册为事件处理程序的函数，该函数将 promise 兑现打印到控制台，
        // 并使用函数setNotes(response.data)将从服务器收到的注释存储到状态中。
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, []) //useEffect的第二个参数用于指定效果的运行频率。如果第二个参数是一个空的数组[]，那么效果就只在组件的第一次渲染时运行。
  // 定义该组件的函数主体被执行，该组件被首次渲染。在这一点上，render 0 notes被打印出来，意味着数据还没有从服务器上获取
  // 对状态更新函数的调用会触发组件的重新渲染。结果，render 3 notes被打印到控制台，而从服务器上获取的笔记被渲染到屏幕上。
  console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      // important: Math.random() < 0.5//我们的笔记有50%的机会被标记为重要
      important: false//我们的笔记有50%的机会被标记为重要
      // id: notes.length + 1 //我们为注释创建一个新的对象，但省略了id属性，因为最好让服务器为我们的资源生成id!
    }

    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     console.log(response)
    //     setNotes(notes.concat(response.data))
    //     //该方法并不改变原始的notes数组，而是创建一个新的数组副本，将新的项目添加到最后。
    //     //这很重要，因为在React中我们必须永远不要直接改变状态!
    //     setNewNote('')//通过调用setNewNote状态的newNote函数来重设受控输入元素的值
    //   })

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  //为了实现对输入元素的编辑，我们必须注册一个事件处理程序，使输入元素的变化与组件的状态同步。
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
    // 事件对象的target属性现在对应于被控制的input元素，而event.target.value指的是该元素的输入值。
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  { console.log('notes', notes) }
  { console.log('notesToShow', notesToShow) }

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    console.log(id)
    console.log(note)
    const changedNote = { ...note, important: !note.important }//旧笔记的完全拷贝
    //{ ...note }创建了一个新的对象，并复制了note对象的所有属性, 同时新对象的important属性到了它在原始对象中先前值的否定

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })


    //新的note会以PUT请求的方式发送到后端，在那里它将取代旧的对象
    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    //   //回调函数将组件的notes状态设置为一个新的数组，该数组包含了之前notes数组中的所有项目，除了旧的笔记，它被服务器返回的更新版本所取代。
    //   //map方法通过将旧数组中的每个项目映射到新数组中的一个项目来创建一个新数组
    //   // 如果note.id !== id为真，我们就把旧数组中的项目复制到新数组中。如果条件是假的，那么由服务器返回的笔记对象就会被添加到数组中
    // })

    console.log(`importance of ${id} needs to be toggled`)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() =>
          setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

// ========================================

//Exercises 2.6.-2.10
//我们来创建一个简单的电话簿

// const App = () => {
//   const [persons, setPersons] = useState([])
//   const [newName, setNewName] = useState('type a name...')
//   const [newNumber, setNewNumber] = useState('type a number...')
//   const [search, setSearch] = useState('')
//   const [result, setResult] = useState([])


// //数据的初始状态是使用axios-library从服务器获取的。用一个效果钩子来完成获取。
//   useEffect(() => {
//     console.log('effect')
//     axios
//       .get('http://localhost:3001/persons')
//       .then(response => {
//         console.log('promise fulfilled')
//         setPersons(response.data)
//       })
//   }, [])
//   console.log('render', persons.length, 'persons')



//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewName(event.target.value)
//   }

//   const handleNumberChange = (event) => {
//     console.log(event.target.value)
//     setNewNumber(event.target.value)
//   }

//   const addPerson = (event) => {
//     event.preventDefault()
//     console.log('button clicked', event.target)
//     const personObject = {
//       name: newName,
//       id: persons.length + 1,
//       number: newNumber
//     }
//     if (persons.find(person => person.name === newName)) {
//       alert(`${newName} is already added to phonebook`)
//       setNewName('type a name...')
//       setNewNumber('type a number...')
//       return
//     }
//     setPersons(persons.concat(personObject))
//     setNewName('type a name...')
//     setNewNumber('type a number...')
//   }

//   const handleSearchChange = (event) => {
//     console.log(event.target.value)
//     setSearch(event.target.value)
//   }

//   const searchTarget = (event) => {
//     // 实现一个搜索字段，可以用来按名字过滤人的列表
//     event.preventDefault()
//     const searchResult = persons.filter(person =>
//       person.name.toLowerCase() === search.toLowerCase()
//     );
//     console.log('searchResult', searchResult)
//     setResult(searchResult)

//   }

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <SearchFilter searchTarget={searchTarget} search={search} setSearch={setSearch} setResult={setResult}
//         handleSearchChange={handleSearchChange} />
//       <h2>Add a New</h2>
//       <PersonForm addPerson={addPerson} newName={newName}
//         handleNoteChange={handleNoteChange} newNumber={newNumber}
//         handleNumberChange={handleNumberChange} />
//       <h2>Numbers</h2>
//       {/* 通过允许用户向电话簿中添加电话号码来扩展你的应用 */}
//       <Persons result={result} persons={persons} />
//     </div>
//   )
// }

// ========================================


// API https://restcountries.com以机器可读的格式提供不同国家的数据，这是所谓的REST API。

// 创建一个应用，在其中可以查看不同国家的数据。这个应用可能应该从端点all获取数据。

// 用户界面非常简单。要显示的国家是通过在搜索栏里输入一个搜索查询来找到的。

// 如果有太多(超过10个)国家符合查询条件，则会提示用户使他们的查询更具体。
// const App = () => {
//   const [country, setCountry] = useState([])
//   const [newName, setNewName] = useState('')
//   const [result, setResult] = useState([])
//   const [weather, setWeather] = useState([])

//   //从服务器获取国家数据
//   useEffect(() => {
//     // console.log('effect')
//     axios
//       .get('https://restcountries.com/v3.1/all')
//       .then(response => {
//         console.log('promise fulfilled')
//         setCountry(response.data)
//       })
//   }, [])

//   const handleChange = (event) => {
//     setNewName(event.target.value)
//   }

//   const searchTarget = (event) => {
//     event.preventDefault()
//     const searchResult = country.filter(country =>
//       country.name.common.toLowerCase().includes(newName.toLowerCase())
//     );
//     console.log('searchResult', searchResult)
//     setResult(searchResult)
//     searchResult.forEach(country => {
//       if (country.capitalInfo && country.capitalInfo.latlng
//         && country.capitalInfo.latlng.length === 2) {
//           console.log(country)
//         const [lat, lon] = country.capitalInfo.latlng;
//         getWeather(lat, lon, country.cca3);
//       }
//     });
//   }

//   const getWeather = (lat, lon, countryCode) => {
//     const apiKey = import.meta.env.VITE_API_KEY
//     // variable api_key has now the value set in startup
//     // const apiKey = 'b939ddee5c336455491661e92b1aace4'; // Replace with your OpenWeatherMap API key
//     axios
//     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//     .then(response => {
//       setWeather(prevWeather => {
//         const updatedWeather = {
//           ...prevWeather,
//           [countryCode]: response.data
//         };
//         console.log(updatedWeather); // Print updated weather here
//         return updatedWeather;
//       });
//     });
//   }

//   const processResult = (result) => {
//     if (result.length > 10) {
//       return 'Too many matches, specify another filter'
//     }
//     if (result.length === 1) {
//       return result.map(country => (
//         <div key={country.cca3}>
//           <h2>{country.name.common}</h2>
//           <p>capital {country.capital[0]}</p>
//           <p>population {country.population}</p>
//           <h3>languages</h3>
//           <ul>
//             {Object.values(country.languages).map((language, index) => (
//               <li key={index}>{language}</li>
//             ))}
//           </ul>
//           <img src={country.flags.png} alt={country.name.common} width="200" height="100" />
//           {weather[country.cca3] && (
//             <div>
//               <h3>Weather in {country.capital}</h3>
//               <p>Temperature: {weather[country.cca3].main.temp} K</p>
//               <p>Weather: {weather[country.cca3].weather[0].description}</p>
//               <img
//                 src={`https://openweathermap.org/img/wn/${weather[country.cca3].weather[0].icon}@2x.png`}
//                 alt="Weather icon"
//               />
//             </div>
//           )}
//         </div>
//       ))
//     }
//     return result.map(country => (
//       <div key={country.cca3}>
//         <p>{country.name.common}
//           <button onClick={() => {
//             setResult([country])
//           }}>show</button>
//         </p>
//       </div>
//     ))
//   }

//   return (
//     <div>
//       <form onSubmit={searchTarget}>
//         <div>
//           find countries: <input value={newName} onChange={handleChange} />
//         </div>
//         <div>
//           <button type="submit">search</button>
//         </div>
//       </form>
//       <div>{processResult(result)}</div>
//     </div>
//   )
// }

export default App