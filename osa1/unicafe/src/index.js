import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const StatisticsLine = (props) => {
    return <tr>{props.text} {props.value}</tr>
}

const Statistics = (props) => {
    let all = props.good+props.neutral+props.bad
    if(all === 0){
        return <div>No feedback given</div>
    }

    let average = 0
    let positive = 0

    if(all !== 0) {
        average = (props.good - props.bad) / all
        positive = (props.good / all) *100
        positive += " %"
    }
    
    return (
        <div>
            <table>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="all" value={all}/>
            <StatisticsLine text="average" value={average}/>
            <StatisticsLine text="positive" value={positive}/>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)