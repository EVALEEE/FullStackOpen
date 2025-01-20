import React from 'react'
import ReactDOM from 'react-dom/client'

const Header = ({ course }) => {
    { console.log(course) }
    return (
        // <h1>{course.name}</h1>
        //遍历
        <h1>{course.name}</h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    console.log(course)
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({ course }) => {
    //遍历parts里面的exercises
    console.log(course)
    const sum = course.parts.map(part => part.exercises).reduce((s, p) => s + p, 0)

    return (
        <p><strong>Number of exercises {sum}</strong></p>
    )
}

const Course = ({ courses }) => {
    console.log(courses)
    return (
        <div>
            {courses.map(course => (
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            ))}
        </div>
    )
}
export default Course