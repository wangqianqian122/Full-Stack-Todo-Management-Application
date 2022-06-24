import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js' 
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

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
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login"> Login</Link> </li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}> Logout</Link> </li>}
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

export default HeaderComponent