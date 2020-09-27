import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        showSpinner: false
    };

    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props);

        
        // show spinner
        this.setState({showSpinner: true});
        // .json is required for firebase
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Vicky kumar',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '121212',
                    country: 'India'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        };
        
        axiosInstance.post("/orders.json",order).then((res) =>{
            // hide spinner
            this.setState({showSpinner: false, purchasing: false});
           
            this.props.history.push("/");
        }).catch((err) =>{
             // hide spinner
             this.setState({showSpinner: false, purchasing: false});
            console.log(err);
        });
    }

    render(){
        console.log(this.props);
        let form = (
            <form>
            <input className = {classes.Input}  type="text" name="name" placeholder="Your name" />
            <input className = {classes.Input} type="email" name="email" placeholder="Your email" />
            <input className = {classes.Input} type="text" name="street" placeholder="Your street" />
            <input className = {classes.Input} type="text" name="postal" placeholder="Your postal code" />
            <Button btnType = "Success" clicked={this.orderHandler} > ORDER </Button>
        </form>
        );

        if(this.state.showSpinner){
            form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
               
                
                <h4>Enter your contact data</h4>
                    
                {form}
                
            </div>
        )
    }
}

export default ContactData;