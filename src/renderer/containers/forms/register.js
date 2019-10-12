
import React, { Component } from 'react'

import {LOGIN} from '../../../shared/constants/Routes'

//components
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import inputField  from './input'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { register } from '../../../shared/actions/register'

class Register extends Component {


    constructor(props) {
        super(props)
        this.state = {
            loginmsg: ''
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.status)

        if (nextProps.status && nextProps.status === 'REGISTERED' && nextProps.user) {
            console.log('HEllo')
            NotificationManager.info('You will recieve a message on ' + nextProps.user.email, 'Registration completed', 8000)
        }
        else if (nextProps.status && nextProps.status === 'UNREGISTERED') {
            NotificationManager.error('Try again later', 'Sorry Registeration did\'t complete!', 'Try again later', 8000)
        }
        else if (nextProps.status && nextProps.status === 'EXISTED') {
            NotificationManager.error('Email is already used ', 'Error', 8000)
        }
    }

    onSubmit(values) {
        this.props.register(values)


    }

    render() {
        return (
            <div>
                <form method='POST' id="login" onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>

                    <Field name='name' component={inputField} type="text" className="form-control" id="name" aria="emailHelp" placeholder="User name" />

                    <Field name='email' component={inputField} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />

                    <Field name='password' component={inputField} type="password" className="form-control" id="password" placeholder="Password" />

                    <button id="regBtn" type="submit" className="form-control btn-dark btn btn-secondary">Register</button>
                    <span className="form-group " style={{ 'color': 'red' }}>
                        {this.state.loginmsg}
                    </span>

                    <div className="link" id="loginLink"><Link to='/login'>Have account ?</Link></div>

                </form>




                <NotificationContainer />

            </div>
        )
    }
}

let validate = (values) => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required '
    }
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
    return errors


}

const mapStateToProps = (state) => {
    return { status: state.settings.registered, user: state.settings.userData }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ register }, dispatch)
}


export default reduxForm({
    validate,
    form: 'register'
})(connect(mapStateToProps, mapDispatchToProps)(Register))