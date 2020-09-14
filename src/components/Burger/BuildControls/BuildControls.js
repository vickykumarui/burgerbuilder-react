import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]
const buildControls = (props) =>{

    let isOrderBtnEnabled = false;
    for(let val in props.disabledInfo){
        if(props.disabledInfo[val]){
            isOrderBtnEnabled = true;
        }
    }
    return (
        <div className = {classes.BuildControls}>
            <p>Burger price = <strong> {props.price.toFixed(2)} </strong> </p>
            { controls.map((val) =>{
                return <BuildControl disabledInfo = {props.disabledInfo[val.type]} key={val.label} clickHandlerLess = {props.clickHandlerLess} clickHandlerMore = {() => props.clickHandlerMore(val.type)} label = {val.label} type = {val.type} />
            })

            }
            <button className = {classes.OrderButton} disabled = {!isOrderBtnEnabled} onClick = {props.openOrderSummary}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;