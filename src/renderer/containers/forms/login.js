import React, { Component } from 'react'


//components
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import inputField  from './input'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { login } from '../../../shared/actions/login'
import { LOGIN } from '../../../shared/constants/Routes';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: ''
        }
    }

    onSubmit(values) {
        this.props.login(values)
    }

    render() {
        return (

            <form id="login" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                <div className="form-group">
                    <Field name='email' component={inputField} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <Field name='password' component={inputField} type="password" className="form-control" id="password" placeholder="Password" />
                </div>


                <button id="loginBtn" type="submit" className="form-control btn-dark btn btn-secondary">Login</button>
                <span className="form-group " style={{ 'color': 'red' }}>
                    {this.state.loginmsg}
                </span>

                <div className="link" id="registerLink"><Link to='/register'>Create new accoount</Link></div>

            </form>


        )
    }
}

let validate = (values) => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters at least'
    }
    ////console.log(errors)
    return errors


}

const mapStateToProps = (state) => {
    return { status: state.settings.log }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login }, dispatch)
}

export default reduxForm({
    validate,
    form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(Login))