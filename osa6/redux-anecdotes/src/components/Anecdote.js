
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={handleClick}>vote</button>
                </div>
            </div>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    return (
        <ul>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(voteOnAnec(anecdote.id))
                        dispatch(setNotification(`Voted on '${anecdote.content}'`, 5))
                    }
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList