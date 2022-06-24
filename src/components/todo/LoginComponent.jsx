import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js' 


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
        //console.log(this.state);
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
            //console.log('Successful')
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            
            //如果成功，跳转页面刀welcome+用户名 的网址
            this.props.navigate(`/welcome/${this.state.username}`)
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
                <h1>Login</h1>
                {/*
                <ShowInvalidCredential hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> 
                简化如下，function也不需要写
                */}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}

                <div className="TodoApp">
                    User Name: <input type="text" name = "username" value = {this.state.username} onChange={this.handleChange} />
                    Passwords: <input type="password" name="password" value = {this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )  
    }
}

export default LoginComponent