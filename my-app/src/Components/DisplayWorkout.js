import React from 'react';
import WeekDisplay from './DisplayWorkout/WeekDisplay'

const DisplayWorkout = (props) => {
    return(
        <WeekDisplay equip={props.equip} setEquip={props.setEquip} daysOfWeek={props.daysOfWeek} setDays={props.setDays} goal={props.goal} setGoal={props.setGoal} database={props.database}/>
    )
}

export default DisplayWorkout