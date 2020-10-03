import React from 'react';
import classes from './Input.css';
const input = (props) => {
   let inputElement = null;
   let inputClasses = classes.InputElement;
   let errorMessage = "";

   if(props.invalid && props.shouldValidate && props.touched){
        inputClasses = inputClasses + " " + classes.Invalid; 
   errorMessage = <p className = {classes.Error}> Please enter valid {props.elementConfig.placeholder}</p>;
   }

   switch(props.elementType) {
       case ('input'):
           inputElement = <input onChange = {props.changed} className = {inputClasses}  {...props.elementConfig} value = {props.value} />;
           break;
        case ('textarea'):
            inputElement = <textarea onChange = {props.changed} className = {inputClasses} 
            {...props.elementConfig} value = {props.value} />;
            break;
        case ('select'):
            inputElement = (<select onChange = {props.changed} className = {inputClasses} value = {props.value}>
                               {props.elementConfig.options.map((optEle) =>
                                   <option key = {optEle.value} value = {optEle.value}>
                                       {optEle.displayValue}
                                    </option>
                               )}
                            </select>)
            break;
        default:
            inputElement = <input onChange = {props.changed} className = {inputClasses}  {...props.elementConfig} value = {props.value} />;
   }

   return (
    <div className = {classes.Input}>
        <label className = {classes.Label}>{props.label}</label>
        {errorMessage}
        {inputElement}
    </div>
);

    }

export default input;