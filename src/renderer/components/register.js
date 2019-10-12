
import React, { Component } from 'react'
import './forms.css'
import Form from '../containers/forms/register'

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import logo from '../../login-logo.jpg'



export default class Register extends Component {


	constructor(props) {
		super(props)
		this.state = {
			loginmsg: ''
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">

						<div className="row">

							<div className=" l col-sm-3">
								<div className="leftContent">
									<img src={logo} alt="gravity-logo" />
								</div>
							</div>							
							<div className="col-sm-9 ">
								<div className="rightContent">
									<Form />
								</div>
							</div>

						</div>
					</div>
				</div>

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