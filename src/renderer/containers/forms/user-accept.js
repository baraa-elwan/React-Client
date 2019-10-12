import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Header from '../../components/Header'
import FF from './user'
import { confirm } from '../../../shared/actions/usersActions'
//redux
import inputField from './input'
import Select from 'react-select'

// //styles
// import './Form.css'

//components
import { loadRoles } from '../../../shared/actions/usersActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const styles = {
    header: {
        padding: '15px',
        borderBottom: '#f1f1f1 solid 1px',
        fontSize: '13px'
    }
}

class Form extends Component {

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
       // this.props.loadRoles()
    }

    componentWillReceiveProps(next) {
        if (next.roles) {

            let roles = next.roles.map(
                role => {
                    return { value: role.id, label: role.name }
                }
            )


            this.setState({ roles })
            console.log(this.state.roles)
        }
        // if (next.initialValues) {

        //     let selectedRoles = next.initialValues.roles.map(role => role.id)
        //     let defaults = next.initialValues.roles.map(role => { return { value: role.id, label: role.name } })
        //     console.log(defaults)
        //     this.setState({ selectedRoles, defaults })
        // }
    }

    handleRolesSelect(opts) {
        let selectedRoles = opts.map(opt => {
            console.log(opt)
            return opt.value
        })
        console.log(selectedRoles)
        this.setState({ selectedRoles })

    }

    onSubmit(values) {
        console.log(this.state.selectedRoles)
        this.props.confirm( this.props.initialValues.id, this.state.selectedRoles)
        this.props.close()
    }

    changeTab(){
        this.props.changeTab('tab1')
    }

    render() {
        return (
            <div className='m-user-details'>

                <button className='btn btn-outline-secondary btn-dark btn-sm' style={{ float: 'right' }}
                    onClick={() => { this.props.close() }}><FontAwesomeIcon icon='times' /></button>
                <Header title='Confirm Request' className='text-secondary' styles={styles.header} />

                <form method='POST' className='form m-form ' onSubmit={this.props.handleSubmit((event) => this.onSubmit(event))}>
                    {/* <div className='row'>
                    <div className='col-md-8'> */}
                    <Field name='name' id='name' component={inputField} type='text' placeholder='' className='form-control form-control-sm' />
                    <Field name='email' id='email' component={inputField} type='text' placeholder='' className='form-control form-control-sm' />
                    <div className="form-group row">
                        <label className='col-sm-3 col-form-label'>Roles</label>
                        <Select
                            closeMenuOnSelect={false}
                            options={this.state.roles}
                            className='multi-select form-control-sm col-sm-8'
                            isMulti
                            onChange={this.handleRolesSelect.bind(this)}
                        />
                    </div>
                    <button type='submit' className='btn btn-sm  btn-dark btn-secondary'
                        onClick={()=>this.props.close()}>confirm</button>
                    <button type='button' className='btn btn-sm btn-dark btn-outline-secondary'
                        onClick={()=>this.props.close()}>cancel</button>
                </form>
            </div>
        )
    }
}

let validate = (values) => {
    let errors = {};
    if (!values.name)
        errors.name = 'Required'
    return errors;
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ confirm, loadRoles }, dispatch)
}

const mapStateToProps = (state) => {

    return {
        roles: state.users.roles, 
        initialValues: state.users.userDetails
    }
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'new_user',
    enableReinitialize: true
})(Form))

