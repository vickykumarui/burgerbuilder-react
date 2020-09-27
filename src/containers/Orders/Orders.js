import React, { Component } from 'react'; 
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axiosInstance.get('/orders.json').then(res =>{
            const ordersArr = []
            for(let key in res.data){
                ordersArr.push({ ...res.data[key], id: key});
            }
            console.log(ordersArr);
            this.setState({loading: false, orders: ordersArr});
            console.log(res);

        }).catch((err) =>{
            console.log(err);
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                    <Order ingredients = {order.ingredients} price = {+order.price} key = {order.id} />
                    ))
                }
                
                
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axiosInstance);