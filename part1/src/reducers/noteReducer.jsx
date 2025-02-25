import { createSlice } from '@reduxjs/toolkit'

const initialState = []

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

