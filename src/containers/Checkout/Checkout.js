import React,{ Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    
    chekoutCancelledHandler = () =>{
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    
    
    render(){
        let summary = <Redirect to="/" />;
        const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        if(this.props.ings){
            summary =   
                        <div>
                            {purchaseRedirect}
                            <CheckoutSummary 
                                ingredients={this.props.ings}
                                chekoutCancelled={this.chekoutCancelledHandler}
                                checkoutContinued={this.checkoutContinuedHandler}/>
                                <Route  path={this.props.match.path+'/contact-data'} component={ContactData}/>
                        </div>
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

 
export default connect(mapStateToProps)(Checkout);