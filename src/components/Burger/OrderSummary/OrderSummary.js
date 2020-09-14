import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
        <p>Continue to checkout</p>
        </Aux>
    )
}

export default orderSummary;