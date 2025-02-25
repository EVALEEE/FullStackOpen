import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
    counts: [0, 0, 0, 0, 0, 0, 0],
    selected: 0
}

const cafeSlice = createSlice({
    name: 'cafe',
    initialState,
    reducers: {
        incrementGood(state) {
            state.good += 1
        },
        incrementNeutral(state) {
            state.neutral += 1
        },
        incrementBad(state) {
            state.bad += 1
        },
        setCounts(state, action) {
            state.counts[action.payload] += 1
        },
        setSelected(state, action) {
            state.selected = action.payload
        }
    }
})

export const { incrementGood, incrementNeutral, incrementBad, setCounts, setSelected } = cafeSlice.actions

export default cafeSlice.reducer