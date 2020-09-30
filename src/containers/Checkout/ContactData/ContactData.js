import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {

    state = {
       orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                  options: [{
                      value: 'fastest',
                      displayValue: 'Fastest'
                  },
                  {
                    value: 'cheapest',
                    displayValue: 'Cheapest'
                }]
                },
                value: ''
            }
    
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
            <Input elementType="..." elementConfig="..." value="..." />
            <Input inputtype = 'input' type="email" name="email" placeholder="Your email" />
            <Input inputtype = 'input' type="text" name="street" placeholder="Your street" />
            <Input inputtype = 'input' type="text" name="postal" placeholder="Your postal code" />
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