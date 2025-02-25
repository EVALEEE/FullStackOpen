import { createSlice } from '@reduxjs/toolkit'

const initialState = []

// const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'INIT_NOTES':
//             return action.data
//         case 'NEW_NOTE':
//             return [...state, action.data]
//         case 'REMOVE_NOTE':
//             return state.filter(note => note.id !== action.data.id)
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note =>
//                 note.id !== id ? note : changedNote
//             )
//         }
//         default:
//             return state
//     }
// }

// export const createNote = (content, id) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id
//         }
//     }
// }

// export const toggleImportance = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id }
//     }
// }

// export const initializeNotes = (notes) => {
//     return {
//         type: 'INIT_NOTES',
//         data: notes
//     }
// }

// export const removeNote = (id) => {
//     return {
//         type: 'REMOVE_NOTE',
//         data: { id }
//     }
// }
// // 导出 noteReducer
// export default noteReducer;

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        initializeNotes(state, action) {
            return action.payload
        },
        createNote: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(content) {
                return {
                    payload: {
                        content: content.content,
                        important: false,
                        id: content.id
                    }
                }
            }
        },
        removeNote: (state, action) => {
            return state.filter(note => note.id !== action.payload.id)
        },
        toggleImportance: (state, action) => {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            if (noteToChange) {
                noteToChange.important = !noteToChange.important
            }
        }
    }
})

export const { initializeNotes, createNote, removeNote, toggleImportance } = noteSlice.actions

export default noteSlice.reducer

