import React,{Component} from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from'../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            purchasing:false,
        }
    }
    
    componentDidMount(){
        this.props.onInitIngredients();
    }
    

    updatePurchaseHandler = () =>{
        const sum = Object.keys(this.props.ings).map( (igKey) =>{
           return this.props.ings[igKey]; 
        }).reduce((sum,element) =>{
            return sum + element;
        },0);
        return sum > 0;
    }
    
    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else{
            this.props.onSetRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }
    
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }
    
    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null;
        
        
        let burger = this.props.error? <p>Something Wrong</p> :<Spinner />;
                    
        if(this.props.ings){
            burger =  ( <React.Fragment>
                            <Burger ingredients={this.props.ings}/>
                            <BuildControls ingrdientAdded={this.props.onIngredientAdd} 
                               ingrdientRemoved={this.props.onIngredientRemove}
                               disabled={disableInfo}
                               price={this.props.price}
                               purchasable={this.updatePurchaseHandler()}
                               ordered={this.purchaseHandler}
                               isAuth={this.props.isAuthenticated}
                            />
                        </React.Fragment>
                        );
            orderSummary = <OrderSummary ingrdients={this.props.ings} 
                                  purchaseCanceled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  price={this.props.price}
                            />;
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
    } 
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdd: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit()),
        onSetRedirect: (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder,axios));