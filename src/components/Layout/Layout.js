import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes1 from './Layout.css';

const layout = (props) =>{
    return (
        <Aux>
        <div> Toolbar, SideDrawer, Backdrop</div>
        <main className = {classes1.Content}>
            {props.children}
        </main>
        </Aux>
    );
}

export default layout;