import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Random = () => Math.floor((Math.random() * 6))

const App = (props) => {
    let initial = Random()
    const [selected, setSelected] = useState(initial)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
    const [most, setMost] = useState(initial)

    const handleNextClick = () => {
        setSelected(Random)
    }

    const handleVoteClick = () => {
        const newVotes = {...votes}
        newVotes[selected] += 1
        setVotes(newVotes)

        if(newVotes[selected] > newVotes[most]){
            setMost(selected)
        }
    }


    return (
        <div>
            <h2>Anecdote of the day</h2>
            <div>{props.anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <div>
                <Button onClick={handleVoteClick} text='vote' />
                <Button onClick={handleNextClick} text='next anecdote' />
            </div>
            <h2>Anecdote with most votes</h2>
            <div>{props.anecdotes[most]}</div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)