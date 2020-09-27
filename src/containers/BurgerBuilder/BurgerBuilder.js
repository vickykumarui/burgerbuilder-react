import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients:  null,
        totalPrice: 4,
        purchasing: false,
        showSpinner: false
    }

    componentDidMount(){
        // componentDidMount will be called when all child component is loaded
        axiosInstance.get("/ingredients.json").then((res) =>{
            this.setState({ingredients: res.data});
        }).catch((err) =>{
            console.log(err);
        });
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
        let queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+"="+ encodeURIComponent(this.state.ingredients[i]) ); 
        }
        queryParams.push("price="+this.state.totalPrice)
        queryParams = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: "?"+queryParams
        });
        
        
        // this.setState({purchasing: false});
    };
    render() {
        const disabledInfo = {...this.state.ingredients};
        
        return (
            <Aux>
                <Modal show = {this.state.purchasing} closeModalHandler = {this.closeModalHandler}>
                   {this.state.showSpinner ? <Spinner /> : this.state.ingredients ? <OrderSummary price = {this.state.totalPrice} closeModalHandler = {this.closeModalHandler} continueHandler = {this.continueHandler} ingredients = {this.state.ingredients}/> : null}
                    </Modal>
                {this.state.ingredients ? <Burger ingredients = {this.state.ingredients}/> :   <Spinner />}
                
                <BuildControls openOrderSummary = {this.openOrderSummary} disabledInfo = {disabledInfo} clickHandlerLess = {this.clickHandlerLess} clickHandlerMore = { this.clickHandlerMore } price = {this.state.totalPrice} />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);