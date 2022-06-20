import React, { useEffect, useState } from 'react'
import DailyDisplay from './DailyDisplay'
import axios from 'axios'
import './WeekDisplay.css'


const WeekDisplay = (props) => {

    let database = []

    

    
    console.log(database)

    //changes what muscle workout per day of week if push pull is workout type
    const getSchedule = () => {
        let tempDaysWeek = [...props.daysOfWeek]
        let index = 0
        for (let i = 0; i < props.daysOfWeek.length; i++) {
            tempDaysWeek[i].workout = workoutDays[index]
            index < workoutDays.length - 1 ? index++ : index = 0
        }
    }






    ///determines what type of workout plan will be used depending on hopw many days are worked out a week
    let workoutType
    let workoutDays
    if (props.daysOfWeek.length > 4) {
        workoutType = 'PushPull'
        if (props.daysOfWeek.length === 7) workoutDays = ['rest', 'push', 'pull', 'legs', 'push', 'pull', 'rest']
        else if (props.daysOfWeek.length > 5) workoutDays = ['push', 'pull', 'legs', 'rest']
        else {
            workoutDays = ['push', 'pull', 'legs']
        }

    }
    else if (props.daysOfWeek.length === 4) {
        workoutType = 'upperLower'
        workoutDays = ['upper', 'lower', 'upper', 'lower']
    }
    else {
        workoutType = 'fullbody'
        if (props.daysOfWeek.length === 3) workoutDays = ['fullbody', 'fullbody', 'fullbody']
        else if (props.daysOfWeek.length === 2) workoutDays = ['fullbody', 'fullbody']
        else {
            workoutDays = ['fullbody']
        }
    }

    getSchedule()

    //maps each day of week and renders the daily display for each day
    let week = props.daysOfWeek.map(day => <DailyDisplay workoutType={workoutType} muscleGroup={day.workout} day={day.name} goal={props.goal} database={database} key={Math.random(1000)} />)


    return (

        <div>{week}</div>

        /*
        <html>
        <head><title>Workout Schedule</title></head>
    
        <body>
            <h1>Workout Schedule</h1>


            <table id = "table">
                <tr>
                <td>Period / Exercise</td>
                <th>1st Exercise</th>
                <th>2nd Exercise</th>
                <th>3rd Exercise</th>
                <th>4th Exercise</th>
                <th>5th Exercise</th>
                <th>6th Exercise</th>
                </tr>
                {week}
                
            </table>

        </body>

        </html>
        */
    )

}

export default WeekDisplay