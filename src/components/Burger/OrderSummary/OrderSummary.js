import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    /*
    {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
        <li>Salad: 1</li>
        <li>Balad: 2</li>
    */
   let listItems = [];
     const ingredientsSummary = props.ingredients;
    // for(let item in ingredientsSummary){
    //     listItems.push(<li key = {item}> {item} : {ingredientsSummary[item]}</li>)
    // }
    listItems = Object.keys(ingredientsSummary).map( igKey => <li key = {igKey}> <span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {ingredientsSummary[igKey]}</li>)
    return(
        <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingred</p>
        <ul>
        {listItems}
        </ul>
    <p>Total Price: <strong> {props.price}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType = 'Danger' clicked = {props.closeModalHandler}>CANCEL</Button>
        <Button btnType = 'Success' clicked = {props.continueHandler}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;