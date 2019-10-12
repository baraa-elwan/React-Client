import React, { Component } from 'react'

//component
import { Field, reduxForm } from 'redux-form'
import inputField from './input'
import  selectField from './select' 
import textAreaField  from './textarea'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addClient, updateClient } from '../../../shared/actions/clientActions'

class client extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type,
			id:null
		}
	}


	componentWillReceiveProps(next){
		if(next.initialValues)
			this.setState({id: next.initialValues.id})
	}

	onSubmit(values) {
		if (this.state.type)
			this.props.updateClient(this.props.id, values)
		else
			this.props.addClient(values)

		this.props.changeTab('tab1')
	}

	render() {
		return (

			<form method={this.props.type ? 'PUT' : 'POST'} className='form m-form' onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
				<Field name='name' id='name' component={inputField} type='text' />
				<Field name='address' id='address' component={inputField} type='text' />
				<Field name='email' id='email' component={inputField} type='text' />
				<Field name='branch' id='branch' component={selectField} type='text' />
				<Field name='phone' id='phone' component={inputField} type='text' />
				<Field name='mobile' id='mobile' component={inputField} type='text' />
				<Field name='info' id='info' component={textAreaField} />

				<button type='submit' className='btn  btn-dark btn-secondary'>Save</button>
				<button type='button' className='btn  btn-dark btn-outline-secondary'
				 onClick={() => this.props.changeTab('tab1')}>cancel</button>
			</form>
		)
	}
}


//form validator
let validate = (values) => {
	let errors = {};
	if (!values.name)
		errors.name = 'Required'
	return errors;
}

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ addClient, updateClient }, dispatch)
}

let mapStateToProps = (state) => {
	return { initialValues: state.clients.details }
}



let InitializeFromStateForm = reduxForm({
	validate,
	form: 'new_client',
	enableReinitialize: true
})(client)

export default InitializeFromStateForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(InitializeFromStateForm)

