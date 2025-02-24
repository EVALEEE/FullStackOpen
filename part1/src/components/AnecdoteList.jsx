import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from './Button'

const AnecdoteList = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
      ]

    const dispatch = useDispatch()
    const counts = useSelector(state => state.counts)
    const selected = useSelector(state => state.selected)

    const handleNextClick = () => {
        dispatch({
            type: 'SET_SELECTED',
            index: Math.floor(Math.random() * anecdotes.length)
        })
    }

    const handleVote = () => {
        dispatch({
            type: 'COUNTS',
            index: selected
        })
    }

    return (
        <div>
            <div className='card'>
                "{anecdotes[selected]}"
            </div>
            <div>
                <p>has {counts[selected]} votes</p>
            </div>
            <div className="button-container">
                <Button handleClick={handleNextClick} text='anecdotes' />
                <Button handleClick={handleVote} text='vote' />
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                <p>{anecdotes[counts.indexOf(Math.max(...counts))]}</p>
            </div>
        </div>
    )
}

export default AnecdoteList