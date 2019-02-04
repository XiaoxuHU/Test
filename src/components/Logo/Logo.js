import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) =>(
    <div className={classes.Logo} alt="burger-logo">
        <img src={BurgerLogo} alt="burger-logo"/>
    </div>
);
    


export default logo;