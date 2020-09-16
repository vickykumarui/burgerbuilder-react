import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
            return nextProps.show !== this.props.show;
    }
   componentDidUpdate(){
       console.log('componentDidUpdate Modal');
   }

    render(){
        return (
            // <div className = {classes.Modal}
            // style = {{
            //     transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
            //     opacity: props.show ? '1':'0'
            // }}>
            //     {props.children}
            // </div>
            <Aux>
            <Backdrop show = {this.props.show} closeModalHandler = {this.props.closeModalHandler}></Backdrop>
            <div className = {`${classes.Modal} ${this.props.show ? classes.show : ''}`} >
                {this.props.children}
            </div>
            </Aux>
        )
    }

} 

export default Modal;