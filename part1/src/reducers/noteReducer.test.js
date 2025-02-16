import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('returns new state with action NEW_NOTE', () => {
        const state = []
        const action = {
            type: 'NEW_NOTE',
            data: {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            }
        }

        deepFreeze(state)
        //deepFreeze(state) 命令确保了还原器不会改变作为参数给它的存储的状态
        //如果reducer使用push命令来操作状态，测试将不会通过
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })

    test('returns new state with action TOGGLE_IMPORTANCE', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2
            }]

        const action = {
            type: 'TOGGLE_IMPORTANCE',
            data: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)

        expect(newState).toContainEqual(state[0])

        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            important: true,
            id: 2
        })
    })
})