import React from 'react';
import WeekDisplay from './DisplayWorkout/WeekDisplay'

const DisplayWorkout = (props) => {
    return(
        <WeekDisplay database={props.database} setDatabase={props.setDatabase} equip={props.equip} setEquip={props.setEquip} daysOfWeek={props.daysOfWeek} setDays={props.setDays} goal={props.goal} setGoal={props.setGoal}/>
    )
}

export default DisplayWorkout