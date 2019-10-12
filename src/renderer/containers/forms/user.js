import React, { Component } from 'react'


//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import inputField from './input'
import Select from 'react-select'

// //styles
// import './Form.css'

//components
import { Field, reduxForm } from 'redux-form'
import { addUser, loadRoles } from '../../../shared/actions/usersActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class user extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            selectedRoles: [],
            defaults: [],

            name: '',
            email: ''

        }
    }
    componentWillMount() {
        this.props.loadRoles()
    }

    componentWillReceiveProps(next) {
        if (next.roles) {

            let roles = next.roles.map(
                role => {
                    return { value: role.id, label: role.name }
                }
            )

            this.setState({ roles })
        }
        if (next.initialValues) {

            let selectedRoles = next.initialValues.roles.map(role => role.id)
            let defaults = next.initialValues.roles.map(role => { return { value: role.id, label: role.name } })
            console.log(defaults)
            this.setState({ selectedRoles, defaults })
        }
    }

    handleRolesSelect(opts) {
        let selectedRoles = opts.map(opt => {
            return opt.value
        })
        //console.log(selectedRoles)
        this.setState({ selectedRoles })
    }

    onSubmit(values) {
        this.props.addUser({ ...values, rids: this.state.selectedRoles })
    }

    changeTab(){
        this.props.changeTab('tab1')
    }
    render() {
        return (



            <form method='POST' className='form m-form ' onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                {/* <div className='row'>
                    <div className='col-md-8'> */}
                <Field name='name' id='name' component={inputField} type='text' placeholder='' className='form-control form-control-sm' />
                <Field name='email' id='email' component={inputField} type='text' placeholder='' className='form-control form-control-sm' />
                <Field name='password' id='password' component={inputField} className='form-control form-control-sm' />
                <div className="form-group row">
                    <label className='col-sm-3 col-form-label'>Roles</label>
                    <Select
                        defaultValue={this.state.roles?this.state.roles:[]}
                        closeMenuOnSelect={false}
                        options={this.state.roles}
                        className='multi-select form-control-sm col-sm-8'
                        isMulti
                        onChange={this.handleRolesSelect.bind(this)}
                    />
                </div>
                <button type='submit' className='btn btn-sm  btn-dark btn-secondary'
                    onClick={this.changeTab.bind(this)}>Save</button>
                <button type='button' className='btn btn-sm btn-dark btn-outline-secondary'
                    onClick={this.changeTab.bind(this)}>cancel</button>
                {/* </div>
                </div> */}
            </form>


        )
    }
}

let validate = (values) => {
    let errors = {};
    if (!values.name)
        errors.name = 'Required'
    if (!values.email)
        errors.email = 'Required'
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = 'Invalid Email'
    return errors;
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addUser, loadRoles }, dispatch)
}

let mapStateToProps = (state) => {
    return { roles: state.users.roles, initialValues: state.users.userDetails }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    validate,
    form: 'new_user',
    enableReinitialize: true
})(user))

