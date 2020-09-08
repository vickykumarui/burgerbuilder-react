import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    
    const transformedBurgerIngArr = Object.keys(props.ingredients).
    map((igVal) => { 
        return [...Array(props.ingredients[igVal])].
        map((_, idx) => {
             return <BurgerIngredient key = {igVal + idx} type={igVal}/>
    });
}).reduce((accumulator, val) => accumulator.concat(val), []);

// if(transformedBurgerIngArr.length === 0){
//     transformedBurgerIngArr = <p>Please start adding ingredients</p>
// }

    // const burgerContent = [];
    // let keys = 1;
    // for(let i =0; i< burgerIngArr.length; i++ ){
    //     for(let j = 0; j < props.ingredients[burgerIngArr[i]]; j++){
    //         burgerContent.push(<BurgerIngredient key = {keys} type={burgerIngArr[i]}/>)
    //         keys++
    //     }
       
    // }
    return (
        <div className = {classes.Burger}>

            <BurgerIngredient type="bread-top"/>
            {  transformedBurgerIngArr.length ? transformedBurgerIngArr : <p>Please start adding ingredients</p> }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
