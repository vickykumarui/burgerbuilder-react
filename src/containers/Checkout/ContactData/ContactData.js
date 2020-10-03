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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
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
       formIsValid: false,
        showSpinner: false
    };

    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props);
        // show spinner
        this.setState({showSpinner: true});

        const formData = {};
        for(let eleid in this.state.orderForm){
            formData[eleid] = this.state.orderForm[eleid].value;
        }
        // .json is required for firebase
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
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

    checkValidity(value,rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(isValid && rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(isValid && rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,id) =>{
            console.log(event.target.value,id)
            const updatedOrderform = {...this.state.orderForm};
            const updatedElement = { ...updatedOrderform[id] }
            updatedElement.value = event.target.value;
            if(updatedElement.validation){
                updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation);
                updatedElement.touched = true;
            }
            let formIsValid = true;
            for(let ele in this.state.orderForm){
                if(this.state.orderForm[ele].validation && !this.state.orderForm[ele].valid){
                    formIsValid = false;
                    break;
                }
            }
            
            console.log(updatedElement)
            updatedOrderform[id] = updatedElement;
            this.setState({orderForm: updatedOrderform, formIsValid});
    }
    render(){
        console.log(this.props);

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }

        
        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map((formEle) => (
                <Input 
                key = {formEle.id} 
                elementConfig = {formEle.config.elementConfig} 
                elementType = {formEle.config.elementType} 
                invalid = {!formEle.config.valid}
                shouldValidate = {!!formEle.config.validation}
                touched = {formEle.config.touched}
                value = {formEle.config.value} changed = {(event) => this.inputChangeHandler(event,formEle.id)} />
            ))}
            
            <Button btnType = "Success" disabled = {!this.state.formIsValid} > ORDER </Button>
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