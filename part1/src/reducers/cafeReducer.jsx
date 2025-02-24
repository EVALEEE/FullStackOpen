
const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    counts: [0, 0, 0, 0, 0, 0, 0],
    selected: 0
}

const cafeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
            return {
                ...state,
                good: (state.good || 0) + 1
            }
        case 'NEUTRAL':
            return {
                ...state,
                ok: (state.ok || 0) + 1
            }
        case 'BAD':
            return {
                ...state,
                bad: (state.bad || 0) + 1
            }
        case 'COUNTS':
            return {
                ...state,
                counts: state.counts.map((count, index) => {
                    if (index === action.index) {
                        return count + 1
                    }
                    return count
                })
            }
        case 'SET_SELECTED':
            return {
                ...state,
                selected: action.index
            }
        default:
            return state
    }
}

export default cafeReducer;