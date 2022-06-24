import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js' 
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state= {
            welcomeMessage: ''
        }

        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render(){
        return (
            <>
            {/* //welcome页面的显示内容 */}
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>. 
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} 
                    className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )      
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWordService()
        // .then(response => this.handleSuccessfulResponse(response))

        // HelloWorldService.executeHelloWordBeanService()
        // .then(response => this.handleSuccessfulResponse(response))

        HelloWorldService.executeHelloWordPathVariableService(this.props.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error){
        console.log(error.response)
        this.setState({welcomeMessage: error.response.data.message})
    }

}


export default WelcomeComponent