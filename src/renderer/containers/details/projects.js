import React, { Component } from 'react'
import Header from '../../components/Header';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'// Default Style
import { updateProject } from '../../../shared/actions/projectActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'

const styles = {
    header: {
        padding: '15px',
        borderBottom: '#f1f1f1 solid 1px',
        fontSize: '13px',
        marginRight: '10px'
    }
}

class ProjectInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startdate: new Date(),
            enddate: new Date(),
            changed: false,
            changed1: false,
            name: '',
            client: '',
            clientId: '',
            manager: '',
            tasks_f: 0,
            tasks: 0,
            status: ''
        };

        this.handlestartChange = this.handlestartChange.bind(this)
        this.handlestartSelect = this.handlestartSelect.bind(this)
        this.handleendChange = this.handleendChange.bind(this)
        this.handleendSelect = this.handleendSelect.bind(this)
    }

    handlestartChange(date) {
        this.setState({
            startdate: date,
            changed: true
        });
    }

    handlestartSelect(date) {
        this.setState({
            startdate: date,
            changed: true
        });
    }
    handleendChange(date) {
        this.setState({
            enddate: date,
            changed1: true
        });
    }

    handleendSelect(date) {
        this.setState({
            enddate: date,
            changed1: true
        });
    }


    componentWillReceiveProps(next) {
        if (next.project) {
            //console.log('dd'+ new Date(next.project.startdate))
            console.log('bb' + new Date(next.project.enddate))

            let project = next.project



            this.setState({ name: project })
            this.setState({ client: project.client.name })
            this.setState({ clientId: project.client.id })

            this.setState({ manager: project.manager.name })
            this.setState({ status: project.status })

            this.setState({ tasks: project.tasks.length })
            this.setState({ startdate: new Date(project.startdate) })
            this.setState({ enddate: new Date(project.enddate) })
            let tasks_f = project.tasks.filter((task) => {
                return task.status === 'finished'
            })
            this.setState({ tasks_f: tasks_f.length })
        }
    }


    onSubmit(e) {
        e.preventDefault()
        this.props.updateProject(this.props.project.id, { enddate: this.state.enddate, startdate: this.state.startdate })
    }
    render() {
        return (
            <div className='m-info'>
                <div className='m-info-section'>
                    {/* <Header title='Details'className='text-secondary'styles={styles.header} /> */}
                    <div className='row'>
                        <div className='col-sm-7 m-left'>
                            <div className='m-details'>
                                <div className='row'>
                                    <label className='col-sm-2'>Client</label>
                                    <p className='col-sm-8 '>
                                        <Link to={`/clients/${this.state.clientId}`}
                                            style={{ textDecoration: 'none', color: '#999' }}>
                                            {this.state.client}
                                        </Link>
                                    </p>

                                </div>
                                <div className='row'>
                                    <label className='col-sm-2'>Manager</label>
                                    <p className='col-sm-8 '> {this.state.manager}</p>

                                </div>

                                <div className='row'>
                                    <label className='col-sm-2'> Pogress</label>
                                    <p className='col-sm-8 '> {this.state.tasks_f + '/' + this.state.tasks} tasks
                                     <span className='badge badge-success'>{this.state.status}</span></p>

                                </div>
                            </div>
                            <Header title='settings' className='text-secondary' styles={styles.header} />
                            <div className='m-details'>
                                <div className='m-details1 row'>

                                    <form method='PUT' className='form' onSubmit={this.onSubmit.bind(this)}>
                                        <Header title='Dates' className='text-secondary' styles={styles.header} />

                                        <div className="row">
                                            <div className="col-md-5">
                                                {/* <div className="project-form form-group row"> */}
                                                {/* <label className='col-form-label col-sm-3' >From</label> */}
                                                <DatePicker
                                                    name='startdate'
                                                    selected={this.state.startdate}
                                                    className='form-control form-control-sm '
                                                    onSelect={this.handlestartSelect} //when day is clicked
                                                    onChange={this.handlestartChange} //only when value has changed
                                                />
                                                {/* </div> */}

                                            </div>
                                            <div className="col-md-5">
                                                {/* <label className='col-form-label col-xs-3' >To</label> */}
                                                <DatePicker
                                                    name='enddate'
                                                    selected={this.state.enddate}
                                                    className='form-control form-control-sm '
                                                    onSelect={this.handleendSelect} //when day is clicked
                                                    onChange={this.handleendChange} //only when value has changed
                                                />

                                            </div>
                                            <div className="col-md-2">
                                                <button type='submit' className='btn form-control-sm btn-dark btn-secondary'><FontAwesomeIcon icon='check' /></button>

                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className='m-details1 row'>

                                    <form method='PUT' className='form' onSubmit={this.onSubmit.bind(this)}>

                                        <Header title='Archive' className='text-secondary' styles={styles.header} />
                                        <div className="row">
                                            <div className="col-md-10">
                                                <input type='checkbox' />Delete File Version<br />
                                                <input type='checkbox' />Send Files to clients<br />
                                            </div>

                                            <div className="col-md-2">
                                                <button type='submit' className='btn form-control-sm  btn-danger'><FontAwesomeIcon icon='archive' /></button>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                                <div className='m-details1 row'>

                                    <form method='PUT' className='form' onSubmit={this.onSubmit.bind(this)}>

                                        <Header title='Reports' className='text-secondary' styles={styles.header} />
                                        <div className="row">
                                            <div className="col-md-10">
                                                <input type='checkbox' />Activity Log<br />
                                                <input type='checkbox' />Files<br />
                                                <input type='checkbox' />Charts<br />


                                            </div>

                                            <div className="col-md-2">
                                                <button type='submit' className='btn form-control-sm  btn-success'><FontAwesomeIcon icon='download' /></button>

                                            </div>
                                        </div>


                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className='col-sm-5'>
                            {/* <div className='m-form form inline'>
                                {/* <div className='row'>
                                    <div className='col-md-12'> 
                                        <Calendar
                                            startdate={ new Date(2019, 8, 21).getDate()}
                                            endDate={new Date(2019, 8, 30)}
                                            rang={true}
                                        />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateProject }, dispatch)
}

let mapStateToProps = (state) => {
    return { project: state.projects.details }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo)