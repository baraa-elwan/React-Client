import React, { Component } from 'react'


//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPermissions, AddRole } from '../../../shared/actions/usersActions'

//component
import FormData from 'form-data'
import Select from 'react-select'
import { stat } from 'fs';
import Header from '../../components/Header';

const styles = {
    header: {
        padding: '15px',
        borderBottom: '#f1f1f1 solid 1px',
        fontSize: '13px',
        marginRight: '10px'
    }
}
class role extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            permissions: [],
            selected: [],
            defaults: [],
            perms: [
                { value: 1, label: 'create' },
                { value: 2, label: 'read' },
                { value: 3, label: 'update' },
                { value: 4, label: 'delete' }]
        }
    }

    componentWillMount() {
        this.props.getPermissions()
    }

    componentWillReceiveProps(next) {
        if (next.permissions) {
            let permissions = next.permissions
            let selected = permissions.map(
                p => {
                    return [p.id, 0, 0, 0, 0]
                }
            )

            this.setState({ permissions, selected })
        }

        if (next.details) {
            let data = next.details
            let perms = this.state.perms
            console.log(data)
            this.setState({ name: data.name, description: data.description })
            let permissions = data.permissions.map(p => {
                let pp = []
                let s = [p.id, 0, 0, 0, 0]
                if (p.role_permissions.create) { pp.push(perms[0]); s[1] = 1 }
                if (p.role_permissions.read) { pp.push(perms[1]); s[2] = 1 }
                if (p.role_permissions.update) { pp.push(perms[2]); s[3] = 1 }
                if (p.role_permissions.delete) { pp.push(perms[3]); s[4] = 1 }
                let permissions = { p, perms: pp }

                return permissions
            }
            )
            console.log(permissions)
            this.setState({ defaults: permissions })


        }
    }


    onSubmit(event) {
        event.preventDefault()
        this.props.AddRole({
            name: this.state.name,
            description: this.state.description,
            permissions: this.state.selected
        })
       this.props.changeTab('tab1')
    }

    handlepermissionSelect(opts, id) {
        let permissions = [id, 0, 0, 0, 0]

        opts.forEach(opt => permissions[opt.value] = 1)

        let selected = this.state.selected
        let p = selected.filter((p, i) => {
            if (p[0] === id)
                selected[i] = permissions

        })
        this.setState({ selected })
    }

    permissionDefaults(id) {
        let defaul = this.state.defaults.filter(d => {
            console.log(d)
            return d.p.id === id
        })

        if (defaul.length) return defaul[0].perms
        return []
    }
    render() {
        return (
            <form method='POST' className='form m-form' onSubmit={(event) => this.onSubmit(event)}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="project-form form-group row">
                            <label htmlFor='name' className='col-sm-4 col-form-label'>Name</label>

                            <input
                                name='name'
                                type='text'
                                className='form-control form-control-sm col-sm-8'
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })} />

                        </div>
                        <div className="project-form form-group row">
                            <label htmlFor='desc' className='col-sm-4 col-form-label'>Description</label>

                            <input
                                name='desc'
                                type='text'
                                className='form-control form-control-sm col-sm-8'
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.target.value })} />
                        </div>
                        <Header title='Permissions' className='text-secondary' styles={styles.header} />
                        <div className='m-details'>
                            {
                                this.state.permissions.map(permission => {

                                    let defaults = this.permissionDefaults(permission.id)

                                    console.log(defaults)
                                    return (
                                        <div className='project-form form-group row'>
                                            <div className='col-sm-4 col-form-label'>
                                                {permission.name}
                                            </div>
                                            < Select
                                                options={this.state.perms}
                                                defaultValue={() => this.permissionDefaults(permission.id).bind(this)}
                                                className='multi-select  form-control-sm col-sm-8'
                                                isMulti
                                                onChange={
                                                    (opts) => this.handlepermissionSelect(opts, permission.id)}
                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <button type='submit' className='btn  btn-dark btn-secondary'>Save</button>
                        <button type='button' className='btn  btn-dark btn-outline-secondary'
                        onClick={()=>this.props.changeTab('tab1')}>cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        permissions: state.users.permissions,
        details: state.users.roleDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPermissions, AddRole }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(role)
