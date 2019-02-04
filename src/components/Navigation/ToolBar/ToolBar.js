import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolBar = (props) =>{
    return  <header className={classes.ToolBar}>
                <DrawToggle clicked={props.drawToggle}/>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.Desktop}>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </header>
}

export default toolBar;