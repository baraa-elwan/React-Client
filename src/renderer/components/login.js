import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//import './forms.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { login } from '../../shared/actions/login'
import logo from '../../login-logo.jpg'
import Form from '../containers/forms/login'

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loggedIn: ''
		}
	}

	componentWillReceiveProps(nxt) {
		if (nxt.status && nxt.status === 'loggedin')
			this.setState({ loggedIn: <Redirect to='/' /> })

	}

	render() {
		return (

			<div className="container">
				<div className="row">
					<div className="col-md-12">

					<Redirect to='/' />

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


			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)