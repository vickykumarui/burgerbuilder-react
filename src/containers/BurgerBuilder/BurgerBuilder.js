import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props){
    //         this.state = {...};
    //     }
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    }
    clickHandlerLess = (type) => {
        const ingredientsCopy = {...this.state.ingredients};
        if(ingredientsCopy[type] <= 0) return;
        ingredientsCopy[type] = ingredientsCopy[type] - 1 ;
        const pricereducion = INGREDIENT_PRICES[type];
        this.setState({
            ingredients: ingredientsCopy,
            totalPrice: (this.state.totalPrice - pricereducion)
        });
    }

    clickHandlerMore = (type) => {
        const ingredientsCopy = {...this.state.ingredients};
        ingredientsCopy[type] = ingredientsCopy[type] + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        this.setState({
            ingredients: ingredientsCopy,
            totalPrice: this.state.totalPrice + priceAddition
        });
    }

    openOrderSummary = () => {
        this.setState({purchasing: true});
    };

    closeModalHandler = () =>{
        this.setState({purchasing: false});
    };

    continueHandler = () =>{
        this.setState({purchasing: false});
    };
    render() {
        const disabledInfo = {...this.state.ingredients};
        
        return (
            <Aux>
                <Modal show = {this.state.purchasing} closeModalHandler = {this.closeModalHandler}><OrderSummary price = {this.state.totalPrice} closeModalHandler = {this.closeModalHandler} continueHandler = {this.continueHandler} ingredients = {this.state.ingredients}/></Modal>
                <Burger ingredients = {this.state.ingredients}/>
                
                <BuildControls openOrderSummary = {this.openOrderSummary} disabledInfo = {disabledInfo} clickHandlerLess = {this.clickHandlerLess} clickHandlerMore = { this.clickHandlerMore } price = {this.state.totalPrice} />
            </Aux>
        )
    }
}

export default BurgerBuilder;