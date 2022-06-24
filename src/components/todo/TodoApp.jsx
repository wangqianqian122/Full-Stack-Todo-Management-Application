import { render } from '@testing-library/react'
import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js' 
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

//react-router-dom 用于写网址，把不同的页面分开

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import withNavigation from './WithNavigation.jsx' 
import withParams from './withParams.jsx'

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);

        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        
                        {/* <Route path="/todos" element={
                        <AuthenticatedRoute>
                        <ListTodosComponent />
                        </AuthenticatedRoute>
                        } /> */}
                        <Route path="/todos/:id" element={ 
			            	<AuthenticatedRoute>
			            		<TodoComponentWithParamsAndNavigation />
			            	</AuthenticatedRoute>
			            } />

                        <Route path="/todos" element={
			            	<AuthenticatedRoute>
			            		<ListTodosComponentWithNavigation /> 
			            	</AuthenticatedRoute>
			            } />

                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                        <Route path="*" element = {<ErrorComponent/>} />
                        
                    </Routes>
                    <FooterComponent/>
                </Router>
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