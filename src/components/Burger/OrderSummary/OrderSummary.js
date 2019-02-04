import React from 'react';
import Button from '../../UI/Button/Button'


const orderSummary = (props) =>{
    const ingrdientSummary = Object.keys(props.ingrdients).map( (igKey)=>{
        return (<li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingrdients[igKey]}
            </li>);
        });
    
    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <ul>
                {ingrdientSummary}
            </ul>
            <p>Total Price:<strong> $ {props.price.toFixed(1)}</strong></p>
            <p>Continue CheckOut?</p>
            <Button btnType='Success'clicked={props.purchaseContinued}>CONTINUE</Button>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
        </React.Fragment>
    );
}


export default orderSummary;