import React,{useState, useEffect} from 'react'

import SubmitForm from './WorkoutPlanMaker/Submit'
import Nav from './WorkoutPlanMaker/NavBar'
import './WorkoutPlanMaker.css'
import LandingPage from './WorkoutPlanMaker/landingPage'

const ExcersizeFromEquipment = (props) => {

    

    //
    //

    return(
        <div id='background'>
            <Nav />
            <LandingPage />
            <SubmitForm equip={props.equip} setEquip={props.setEquip} daysOfWeek={props.daysOfWeek} setDays={props.setDays} goal={props.goal} setGoal={props.setGoal}/>        
        </div>
    )
}

export default ExcersizeFromEquipment