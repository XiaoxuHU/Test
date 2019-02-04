import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let order = <Spinner />;
        if(!this.props.loading){
            order = (
            this.props.orders.map( order=>{
                 return    <Order  key={order.id}
                            ingrdients={order.ingredients}
                            price={order.price}/>
            }))
        }
        return(
            <div>
                {order}
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders: (token,userId) =>(dispatch(actions.fetchOrders(token,userId)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(Orders,axios));