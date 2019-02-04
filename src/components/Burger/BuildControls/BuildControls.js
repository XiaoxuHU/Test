import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
]
const buildControls = (props) =>{
    return <div className={classes.BuildControls}>
                <p>Current Price:<strong>{props.price.toFixed(1)}</strong></p>
                {controls.map( (ctr)=>{
                    return  <BuildControl key={ctr.label} 
                                     label={ctr.label} 
                                     added={props.ingrdientAdded.bind(this,ctr.type)}
                                     removed={props.ingrdientRemoved.bind(this,ctr.type)}
                                     disabled={props.disabled[ctr.type]}
                                     />
                })}
                <button className={classes.OrderButton} 
                        disabled={!props.purchasable}
                        onClick={props.ordered}>{props.isAuth ? 'PLACE ORDER' : 'SIGN UP TO ORDER'}</button>    
           </div>
}

export default buildControls;
