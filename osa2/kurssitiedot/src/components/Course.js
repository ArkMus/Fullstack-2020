import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props.course);
    return (
        <div>
            {props.course.map((course, i) => 
            <Part key={i} part={course.name} exercises={course.exercises} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            {props.part} {props.exercises}
        </div>
    )
}

const Total = (props) => {
    let total = 0;
    for(let i = 0; i < props.course.length; i++){
        total += props.course[i].exercises
    }
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course