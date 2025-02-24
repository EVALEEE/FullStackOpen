
//Reducer 是一个纯函数，它的职责是根据当前的 state 和一个 action 
//来计算并返回新的 state。它不关心 state 是如何被存储或管理的。
const initialState = []
const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_NOTES':
            return action.data
        case 'NEW_NOTE':
            return [...state, action.data]
        case 'REMOVE_NOTE':
            return state.filter(note => note.id !== action.data.id)
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

export const createNote = (content, id) => {
    return {
        type: 'NEW_NOTE',
        data: {
            content,
            important: false,
            id
        }
    }
}

export const toggleImportance = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: { id }
    }
}

export const initializeNotes = (notes) => {
    return {
        type: 'INIT_NOTES',
        data: notes
    }
}

export const removeNote = (id) => {
    return {
        type: 'REMOVE_NOTE',
        data: { id }
    }
}

// 导出 noteReducer
export default noteReducer;



// //Store 是 Redux 的核心，它负责：
// //保存整个应用的 state。
// //提供 getState() 方法来获取当前 state。
// //提供 dispatch(action) 方法来触发 state 更新。
// //提供 subscribe(listener) 方法来监听 state 的变化。
// const store = createStore(noteReducer) 
// //createStore 是在实际应用中使用的，当你需要将 Reducer 和 React 组件连接起来时

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })
