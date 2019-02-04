import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject,checkValidation } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';


import * as actions from '../../store/actions/index';
import classes from './Auth.css';

class Auth extends Component{
    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                    
                },
                value:'',
                validation:{
                    isEmail: true,
                    required:true
                },
                valid:false,
                touched:false
            },
        
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your password',
                    
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp: true
    }
    
    componentDidMount(){
        if(! this.props.buildingBurger && this.props.authRedirect !== '/'){
            this.props.onSetRedirect();
        }
    }
    
    
    
    inputChangedHandle = (identifier,event) =>{
        const updatedControls = updateObject(this.state.controls,{
            [identifier]: updateObject(this.state.controls[identifier],{
                value: event.target.value,
                valid:checkValidation(event.target.value,this.state.controls[identifier].validation),
                touched:true 
            })
        });
        this.setState({controls:updatedControls});
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    
    switchAuthHandler = ()=>{
        this.setState(prevState =>{
            return {
                isSignUp:!prevState.isSignUp
            }
        })
    }
    

    
    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
               id:key,
               config:this.state.controls[key]
            });
        }
        
        let form = formElementArray.map( (formElement)=>{
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
        
        if(this.props.loading){
            form = <Spinner />
        }
        
        let errorMessage = null;
        
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        
        let redirect = null;
        if(this.props.isAuthenticated){
            
            redirect = <Redirect to={this.props.authRedirect} />
        }
        
        return(
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp? 'Sign Up' : 'Log In'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>Switch to {this.state.isSignUp ? 'Log In' : 'Sign Up'}</Button>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetRedirect: ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);