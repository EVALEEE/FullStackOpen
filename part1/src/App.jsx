import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'
import Note from './components/Note.jsx'
import Course from './components/Course.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import noteService from './services/notes'
import personService from './services/persons'
import Notification from './components/Notification.jsx'
import loginService from './services/login.js'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import NoteForm from './components/NoteForm.jsx'
import { createStore } from 'redux'
import cafeReducer from './reducers/cafeReducer'
import noteReducer from './reducers/noteReducer'
import { createNote, toggleImportance, removeNote, initializeNotes } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'


// Practice 1.6 - 1.14:
//像大多数公司一样，Unicafe从其客户那里收集反馈。你的任务是实现一个收集客户反馈的网络应用。
//反馈只有三个选项。好，中立，和坏。
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

// const App = ({ store }) => {
//   const [selected, setSelected] = useState(0)
//   const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0])
//   const anecdotes = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
//   ]

//   console.log(counts)

//   const handleGoodClick = () => {
//     store.dispatch({
//       type: 'GOOD'
//     })
//   }

//   const handleNeutralClick = () => {
//     store.dispatch({
//       type: 'NEUTRAL'
//     })
//   }

//   const handleBadClick = () => {
//     store.dispatch({
//       type: 'BAD'
//     })
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
//         <Statistics good={store.getState().good}
//           neutral={store.getState().ok}
//           bad={store.getState().bad} />
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
// Notes App:

const Footer = () => {
  // 构成应用功能实体的结构单元是React组件。一个React组件定义了构造内容的HTML，
  // 决定功能的JavaScript函数，以及组件的样式；所有这些都在一个地方。
  // 这是为了创建尽可能独立和可重复使用的单个组件。
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  //useDispatch-hook为任何React组件提供了对index.js中定义的redux-store的dispatch-function的访问
  //允许所有组件对redux-store的状态进行更改
  const notes = useSelector(state => state) //我们需要所有的笔记，所以我们的选择器函数返回整个状态
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  //默认情况下，效果会在每次完成渲染后运行
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/notes')
      .then(response => {
        console.log('promise fulfilled')
        dispatch(initializeNotes(response.data))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility() //在创建一个新的笔记后，通过调用noteFormRef.current.toggleVisibility()来隐藏这个表单
    noteService
      .create(noteObject)
      .then(returnedNote => {
        dispatch(createNote(returnedNote.content, returnedNote.id))
        setErrorMessage('success!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      })
  }

  const notesToShow = showAll
    ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        dispatch(toggleImportance(id))
        setErrorMessage('success!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(`Error: Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        dispatch(removeNote(id))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(//将登录用户的详细信息保存在本地存储中
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
  }

  const loginForm = () => {
    return (
      < Togglable buttonLabel='log in' >
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable >
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  const noteList = () => (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}> show {showAll ? 'important' : 'all'}</button>
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
    </div>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged-in</p>
          {noteForm()}
          {noteList()}
          <button onClick={handleLogout}>logout</button>
        </div>
      }
      <Footer />
    </div>
  )
}

// ========================================

//Exercises 2.6.-2.10
//电话簿

// const App = () => {
//   const [persons, setPersons] = useState([])
//   const [newName, setNewName] = useState('type a name...')
//   const [newNumber, setNewNumber] = useState('type a number...')
//   const [search, setSearch] = useState('')
//   const [result, setResult] = useState([])
//   const [message, setMessage] = useState('')


//   //数据的初始状态是使用axios-library从服务器获取的。用一个效果钩子来完成获取。
//   useEffect(() => {
//     console.log('effect')
//     personService
//       .getAll()
//       .then(returnedPersons => {
//         setPersons(returnedPersons)
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
//     const personObject = {
//       name: newName,
//       number: newNumber
//     }

//     const existingPerson = persons.find(person => person.name === newName)
//     if (existingPerson) {
//       if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
//         personService
//           .update(existingPerson.id, { ...existingPerson, number: newNumber })
//           .then(returnedPerson => {
//             // console.log("aaa", returnedPerson)
//             setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
//             setNewName('type a name...')
//             setNewNumber('type a number...')
//             setMessage(
//               `${personObject.name} has been updated`
//             )
//             setTimeout(() => {
//               setMessage(null);
//             }, 2000);
//           })
//           .catch(error => {
//             console.error('Request failed:', error);
//             setMessage(
//               `Error, ${personObject.name} has been deleted!`
//             )
//             setTimeout(() => {
//               setMessage(null);
//             }, 3000);
//           })

//       }
//     } else {
//       personService
//         .create(personObject)
//         .then(returnedPerson => {
//           setPersons(persons.concat(returnedPerson))
//           setNewName('type a name...')
//           setNewNumber('type a number...')
//           //在成功的操作被执行后（一个人被添加或一个数字被改变）显示一个持续几秒钟的通知。
//           setMessage(
//             `Added ${personObject.name}`
//           )
//           setTimeout(() => {
//             setMessage(null);
//           }, 2000);
//         })
//         .catch(error => {
//           setMessage(
//             `Error, the name should be at least 3 letters! 
//             Or is not a valid phone number! Format: XX-XXXXXX or XXX-XXXXXX`
//           )
//           setTimeout(() => {
//             setMessage(null);
//           }, 3000);
//         })
//     }
//   }

//   const deletePerson = (id) => {
//     if (window.confirm("Are you sure you want to delete this person?")) {
//       personService
//         .deletePerson(id)
//         .then(() => {
//           setPersons(persons.filter(person => person.id !== id))
//           //在成功的操作被执行后（一个人被添加或一个数字被改变）显示一个持续几秒钟的通知。
//           setMessage(
//             `Deleted Sucessfully!`
//           )
//           setTimeout(() => {
//             setMessage(null);
//           }, 2000);
//         })
//         .catch(error => {
//           alert(`The person was already deleted from the server`)
//           setPersons(persons.filter(person => person.id !== id))
//         })
//     }
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
//       {message && <Notification message={message} />}
//       {/* 当 message 为 null 时，Notification 组件将不会被渲染。 */}
//       <SearchFilter searchTarget={searchTarget} search={search} setSearch={setSearch} setResult={setResult}
//         handleSearchChange={handleSearchChange} />
//       <h2>Add a New</h2>
//       <PersonForm addPerson={addPerson} newName={newName}
//         handleNoteChange={handleNoteChange} newNumber={newNumber}
//         handleNumberChange={handleNumberChange} />
//       <h2>Numbers</h2>
//       {/* 通过允许用户向电话簿中添加电话号码来扩展你的应用 */}
//       <Persons result={result} persons={persons} deletePerson={deletePerson} />
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