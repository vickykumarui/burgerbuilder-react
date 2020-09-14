import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    // <div className = {classes.Modal}
    // style = {{
    //     transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
    //     opacity: props.show ? '1':'0'
    // }}>
    //     {props.children}
    // </div>
    <Aux>
    <Backdrop show = {props.show} closeModalHandler = {props.closeModalHandler}></Backdrop>
    <div className = {`${classes.Modal} ${props.show ? classes.show : ''}`} >
        {props.children}
    </div>
    </Aux>
)

export default modal;