import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes1 from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    
    state = {
        showSideDrawer: false
    };
    
   
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }; 

    toggleSideDrawer = () =>{
        this.setState((prevState) => {
           return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return (
            <Aux>
            <Toolbar toggleSideDrawer = {this.toggleSideDrawer}/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler} />
            <main className = {classes1.Content}>
                {this.props.children}
            </main>
            </Aux>
        );
    }
}

export default Layout;