import moment from 'moment'
import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import AuthenticationService from './AuthenticationService'


class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state ={
        id: this.props.params.id,
        description: '',
        targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    //在update里，description显示要update的东西 eg:Learn about Microservices2
    componentDidMount(){
        if(this.state.id=== -1){
            return
        }

        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description : response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    //判断新输入的to do list是否符合
    validate(values){
        let errors = {}

        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5){
            errors.description = 'Enter at least 5 Characters in Description'
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }
    
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.navigate('/todos'))
            console.log(values)
        } else {
            //this state 更新了新输入的内容
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.navigate('/todos'))
            console.log(values)
        }
    }

    render() {
        let {description, targetDate} = this.state
        //let targetDate = this.state.targetDate

        return  <div>
                    <h1>Todo</h1>
                    <div className="container">
                        <Formik
                            // 初始值
                            initialValues={{description,targetDate}}
                            onSubmit = {this.onSubmit}

                            //这两句加上，就只有当点了save后才会出现是否error，否则error在未输入完成时 会一直出现
                            validateOnChange={false}
                            validateOnBur={false}
                            validate={this.validate}
                            enableReinitialize ={true}
                        >

                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name = "description" component="div"
                                                                            className = "alert alert-warning" />
                                        <ErrorMessage name = "targetDate" component="div"
                                                                            className = "alert alert-warning" />

                                        <fieldset className = "form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name = "description" />
                                        </fieldset>

                                        <fieldset className = "form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name = "targetDate" />
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
    }
    
}

export default TodoComponent