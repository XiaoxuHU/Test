import React,{ Component } from 'react';
import { connect } from 'react-redux';
import{ updateObject,checkValidation } from '../../../shared/utility';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-order.js';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                    
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                    
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Address',
                    
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIPCODE',
                    
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            delieveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapeset',displayValue:'Cheapest'}
                    ]
                    
                },
                value:'fastest',
                validation:{},
                valid:true,
            },
        },
        formValid:false,
    }
    
    orderHandler = (event) =>{
        event.preventDefault();
        const formData ={};
        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
    }
    
    inputChangedHandle = (identifier,event) =>{
        const updatedFormElement = updateObject(this.state.orderForm[identifier],{
           value: event.target.value,
           valid: checkValidation(event.target.value,this.state.orderForm[identifier].validation),
           touched: true
        });
        
        const updatedForm = updateObject(this.state.orderForm,{
            [identifier]: updatedFormElement
        })
        
        let formValid = true;
        for(let identifier in updatedForm){
            formValid = updatedForm[identifier].valid && formValid;
        }
        this.setState({orderForm:updatedForm,formValid:formValid});
    }
    
    
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
               id:key,
               config:this.state.orderForm[key]
            });
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map( (formElement)=>{
                        return <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    changed={this.inputChangedHandle.bind(this,formElement.id)}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}/>
                        })
                    }
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formValid}>Order</Button>
                </form>
            );
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Contact</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))    
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(ContactData,axios));