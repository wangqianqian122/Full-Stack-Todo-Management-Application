import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js' 
import moment from 'moment'

class ListTodosComponent extends Component{
    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos: 
            [
                // {id:1, description: 'Learn React', done:false, targetDate: new Date()},
                // {id:2, description: 'Become an Expert at React', done:false, targetDate: new Date()},
                // {id:3, description: 'Visit India', done:false, targetDate: new Date()}
            ],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
            response => {
                //console.log(response) response不是文本 是上面定义的东西
                this.setState({todos : response.data})
            }
            )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        // HTMLFormControlsCollection.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message: `Delete of todo ${id} Successful`})
                this.refreshTodos()
            }
        )
    }

    addTodoClicked(id){
        //console.log('update' + id)
        this.props.navigate(`/todos/-1`)
    }

    updateTodoClicked(id){
        //console.log('update' + id)
        this.props.navigate(`/todos/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Complete?</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className = "btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className = "btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                    <div className='row'>
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent