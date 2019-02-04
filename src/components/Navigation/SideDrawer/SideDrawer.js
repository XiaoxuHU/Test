import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';


const sideDrawer = (props) =>{
    let attachClasses = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachClasses = [classes.SideDrawer,classes.Open];
    }
    return (
        <React.Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                        <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </React.Fragment>
        );
};

export default sideDrawer;