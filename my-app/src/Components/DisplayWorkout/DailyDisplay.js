import React, { useState, useEffect } from 'react'
import './DailyDisplay.css'
import PushPullAlgorithm from '../../WorkoutAlgorithms/PushPullAlgorithm'
import FullbodyAlgorithm from '../../WorkoutAlgorithms/FullBodyAlgorithm'
import UpperLowerAlgorithm from '../../WorkoutAlgorithms/UpperLowerAlgorithm'






const DailyDisplay = (props) => {

    
    if(props.workoutType === 'PushPull'){
        console.log(PushPullAlgorithm(props.database, props.muscleGroup))
    }
    else if(props.workoutType === 'fullbody'){
        console.log(FullbodyAlgorithm(props.database, props.muscleGroup))
    }
    else{
        console.log(UpperLowerAlgorithm(props.database, props.muscleGroup))
    }


    return (
        <div id='day'>
            <h1>{props.muscleGroup}</h1>
            <h1>{props.day}</h1>
        </div>
    )







}

export default DailyDisplay