import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) =>(
    <div className = {classes.BuildControl}> 
        <div className = {classes.Label}>{props.label}</div>
        <button className = {classes.Less} onClick = {props.clickHandlerLess.bind(this,props.type)} disabled = {props.disabledInfo === 0}>Less</button>
        <button className = {classes.More} onClick = {props.clickHandlerMore}>More</button>
    </div>
)

export default buildControl;