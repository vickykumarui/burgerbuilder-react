import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log("componentDidUpdate  OrderSummary");
    }
   
    render(){
        let listItems = [];
        const ingredientsSummary = this.props.ingredients;
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
       <p>Total Price: <strong> {this.props.price}</strong></p>
           <p>Continue to checkout</p>
           <Button btnType = 'Danger' clicked = {this.props.closeModalHandler}>CANCEL</Button>
           <Button btnType = 'Success' clicked = {this.props.continueHandler}>CONTINUE</Button>
           </Aux>
       )
    }

}

export default OrderSummary;