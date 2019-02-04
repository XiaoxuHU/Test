import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you like our burger</h1>
            <div style={{width:'100%',height:'300px',margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div>
                <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
                <Button btnType='Danger'  clicked={props.chekoutCancelled}>CANCEL</Button>
            </div>
        </div>
    );
}

export default checkoutSummary; 