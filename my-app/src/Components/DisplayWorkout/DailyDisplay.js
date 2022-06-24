import React, { useState, useEffect } from 'react'
import './DailyDisplay.css'
import PushPullAlgorithm from '../../WorkoutAlgorithms/PushPullAlgorithm'
import FullbodyAlgorithm from '../../WorkoutAlgorithms/FullBodyAlgorithm'
import UpperLowerAlgorithm from '../../WorkoutAlgorithms/UpperLowerAlgorithm'


let day; // day








const DailyDisplay = (props) => {
    let objs = [];
    let exers = [];
    day = props.day;
    let warmupReps
    let compoundReps;
    let isolationReps;
    let weight;

    if(props.goal === 'buildMuscle'){
        warmupReps = '2x10';
        compoundReps = '3x10';
        isolationReps = '2x12';
        weight = 'Moderate';
    }
    else if(props.goal === 'buildStrength'){
        warmupReps = '2x10';
        compoundReps = '3x6';
        isolationReps = '2x12';
        weight = 'Moderate';
    }
    else if(props.goal === 'loseFat'){
        warmupReps = '2x5 min';
        compoundReps = '3x5 min';
        isolationReps = '2x5 min';
    }
    else{
        warmupReps = '2x5 min';
        compoundReps = '3x5 min';
        isolationReps = '2x5 min';
    }
    
    if(props.workoutType === 'PushPull'){
        objs = PushPullAlgorithm(props.database, props.equip, props.muscleGroup, props.goal, warmupReps, compoundReps, isolationReps);
        console.log(objs);
    }
    else if(props.workoutType === 'fullbody'){
        objs = FullbodyAlgorithm(props.database, props.equip, props.muscleGroup, props.goal, warmupReps, compoundReps, isolationReps);
        console.log(objs)
    }
    else{
        objs = UpperLowerAlgorithm(props.database, props.equip, props.muscleGroup, props.goal, warmupReps, compoundReps, isolationReps);
        console.log(objs);
    }

    
    var i = 0;
    for (i; i < objs.length; i++) {
        exers.push(objs[i].reps + "; " + objs[i].name + ": " + objs[i].muscle);
    }
    while ( i < 6 ) {
        exers.push("Rest Day");
        i++;
    }
    

    return(
        <tr >
            <td>
                {day}
            </td>
            <th>{exers[0]}</th>
            <th>{exers[1]}</th>
            <th>{exers[2]}</th>
            <th>{exers[3]}</th>
            <th>{exers[4]}</th>
            <th>{exers[5]}</th>
        </tr>
    )










}


export default DailyDisplay