import React,{Component} from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerHandler = () =>{
        this.setState({showSideDrawer:false});
    }
    
    sideDrawToggleHandler = () =>{
        this.setState( (prveState) =>{
            return {showSideDrawer:!prveState.showSideDrawer} ;      
        });
    };
    render(){
        return (
            <React.Fragment>
                <ToolBar drawToggle={this.sideDrawToggleHandler} isAuth={this.props.isAuth}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler}  isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>{
    return {
        isAuth:state.auth.token !== null
    }
}



export default connect(mapStateToProps)(Layout);