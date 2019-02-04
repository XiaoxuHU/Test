import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrappedComponent,axios) =>{
    return class extends Component{
        state={
            error:null
        }
        
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req =>{
               this.setState({error:null}); 
               return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res =>{
                return res;
            },error =>{
                this.setState({error: error});
            });
        }
        
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        
        errorConfirmedHanlder = () =>{
            this.setState({error:null});    
        }
        
        render(){
            return(
                <React.Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHanlder}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    } 
}

export default ErrorHandler;