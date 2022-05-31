import React, {Component} from 'react'

//react-router-dom 用于写网址，把不同的页面分开

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import withNavigation from './WithNavigation.jsx' 


class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        return (
            <div className="TodoApp">
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome" element={<WelcomeComponent />} />
                    </Routes>
                </Router>
            </div>
        )
    }
}

class WelcomeComponent extends Component{
    render(){
        return <div>Welcome in28minutes</div>
    }
}

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',  //初始值，可以写成空
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        //调用event 改变username和password
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    //总的 可以同时用于username和event
    handleChange(event) {
        console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    }

    //username 有了这个才能输入东西，不然直接显示in28minutes
    // handleUsernameChange(event) {
    //     console.log(event.target.name);
    //     this.setState(
    //         {
    //             [event.target.name]
    //             :event.target.value
    //         }
    //     )
    // }

    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }


    loginClicked(){
        //console.log(this.state);

        //判断账户密码是否正确
        if(this.state.username === 'in28minutes' && this.state.password === 'dummy'){
            console.log('Successful')
            
            //如果成功，跳转页面刀welcome
            this.props.navigate("/welcome")
            // this.setState({showSuccessMessage:true})
            // this.setState({hasLoginFailed:false})
        }
        else{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
            //console.log('Failed')
    }


    render() {
        return (
            <div>
                {/*
                <ShowInvalidCredential hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> 
                简化如下，function也不需要写
                */}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}

                User Name: <input type="text" name = "username" value = {this.state.username} onChange={this.handleChange} />
                Passwords: <input type="password" name="password" value = {this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )  
    }
}

//简化 不需要写function判断，根据true，false即可
// function ShowInvalidCredential(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }

//     return null
// }

// function ShowLoginSuccessMessage(props){
//     if(props.showSuccessMessage){
//         return <div>Login Successful</div>
//     }

//     return null
// }

export default TodoApp