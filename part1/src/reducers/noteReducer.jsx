import { createStore } from 'redux'

//Reducer 是一个纯函数，它的职责是根据当前的 state 和一个 action 
//来计算并返回新的 state。它不关心 state 是如何被存储或管理的。
const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.data]
        case 'TOGGLE_IMPORTANCE': {
            const id = action.data.id
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        }
        default:
            return state
    }
}

// 导出 noteReducer
export default noteReducer;



//Store 是 Redux 的核心，它负责：
//保存整个应用的 state。
//提供 getState() 方法来获取当前 state。
//提供 dispatch(action) 方法来触发 state 更新。
//提供 subscribe(listener) 方法来监听 state 的变化。
const store = createStore(noteReducer) 
//createStore 是在实际应用中使用的，当你需要将 Reducer 和 React 组件连接起来时

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})

const App = () => {
    return (
        <div>
            <ul>
                {store.getState().map(note =>
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                )}
            </ul>
        </div>
    )
}