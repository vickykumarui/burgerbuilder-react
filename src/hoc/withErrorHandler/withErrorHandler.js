import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
const withErrorHandler = (WrappedComponent, axios) => {
    // component which takes component as argument
    return class extends Component {

        state = {
            error: null
        }


        componentWillMount (){
            // note this is not a side effect it is just registring interceptors
            console.log("withErrorHandler componentDidMount");
           this.requestInterceptor =  axios.interceptors.request.use( req =>{
                this.setState({error: null});
                return req
            })
          this.responseInterceptor = axios.interceptors.response.use(res => res, (err) =>{
                this.setState({error: err});
            });
        }

        componentWillUnmount(){
            // remove interceptor on unmount
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);

        }
        closeModalHandler = () =>{
            this.setState({error: null});
        }
        render() {
            return (
                <Auxiliary>
                    <Modal show = {this.state.error} 
                    closeModalHandler = {this.closeModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;