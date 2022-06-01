import { render } from '@testing-library/react'
import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js' 

//react-router-dom 用于写网址，把不同的页面分开

import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import withNavigation from './WithNavigation.jsx' 
import withParams from './withParams.jsx'


class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                        <Route path="/todos" element={<ListTodosComponent />} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="*" element = {<ErrorComponent/>} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        //console.log(isUserLoggedIn);

        return (
            <header>
                {/* 导航部分,大小颜色 */}
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/* 变成可点击的连接，转向其他网址 */}
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link> </li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link> </li>}
                    </ul>

                    {/* 放到最右边 */}
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {/* 已登陆就不显示login 按钮，显示logout */}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link> </li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout()}>Logout</Link> </li>}
                    </ul>
                </nav>
            </header>

            // <div>
            //     {/* <hr/> 代表线 */}
            //      Header <hr/> 
            // </div>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return (
            <footer className="footer">
                <span classname="text-muted">Created By QQW</span>

            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
            </>
        )
    }
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos: 
            [
                {id:1, description: 'Learn React', done:false, targetDate: new Date()},
                {id:2, description: 'Become an Expert at React', done:false, targetDate: new Date()},
                {id:3, description: 'Visit India', done:false, targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Complete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}


class WelcomeComponent extends Component{
    render(){
        return (
            <>
            {/* //welcome页面的显示内容 */}
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>. 
                    </div>
            </>
        )      
    }
}

//输入不存在的网址，报错
function ErrorComponent() {
    return <div>An Error Occurred. Please contact 1243253.</div>
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