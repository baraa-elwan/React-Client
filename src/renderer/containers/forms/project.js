import React, { Component } from 'react'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { loadClients } from '../../../shared/actions/clientActions'
import { addProject } from '../../../shared/actions/projectActions'
import { loadUsers } from '../../../shared/actions/usersActions'

//components

import DatePicker from 'react-datepicker'
import FormData from 'form-data'
import Files from 'react-files'
//styles
import "react-datepicker/dist/react-datepicker.css";


class Form extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			managerId: 1,
			clientId: 1,
			startdate: new Date(),
			enddate: new Date(),
			files: []
		};

		this.form = new FormData();
		this.form1 = new FormData();
		this.form.append('description', this.state.description)
		this.form.append('managerId', this.state.managerId)

		this.form.append('clientId', this.state.clientId)
		this.form.append('enddate', this.state.enddate)
		this.form.append('startdate', this.state.startdate)

	}

	componentWillMount() {
		this.props.loadClients()
		this.props.loadUsers()
	}

	onFilesChange = (files) => {
		this.setFiles(files)
	}

	onFilesError = (error, file) => {
		//console.log('error code ' + error.code + ': ' + error.message)
	}

	filesRemoveOne = (file) => {
		this.refs.files.removeFile(file)
	}

	filesRemoveAll = () => {
		this.refs.files.removeFiles()
	}

	handlestartChange(date) {
		this.setState({
			startdate: date
		});
	}

	handlestartSelect(date) {
		this.setState({
			startdate: date
		});
	}
	handleendChange(date) {
		this.setState({
			enddate: date
		});
	}

	handleendSelect(date) {
		this.setState({
			enddate: date
		});
	}

	name(event) {
		this.form.append('name', event.target.value)
		this.setState({ name: event.target.value })
	}
	client(event) {
		this.form.append('clientId', event.target.value)

		this.setState({ clientId: event.target.value })
	}
	manager(event) {
		this.form.append('managerId', event.target.value)

		this.setState({ managerId: event.target.value })
	}
	description(event) {
		this.form.append('description', event.target.value)

		this.setState({ description: event.target.value })
	}


	setFiles = (files) => {
		this.setState({
			files
		}, () => {
		})
	}



	filesUpload = (e) => {
		e.preventDefault()
		console.log(this.state.files)
		Object.keys(this.state.files).forEach((key) => {
			const file = this.state.files[key]
			this.form.append(key, new Blob([file], { type: file.type }), file.name || 'file')
		})

		console.log(this.form)
		this.props.addProject(this.form, this.form1)
	}
	managers({ users }) {
		if (users)
			return users = users.map((user) => { return <option key={user.id} value={user.id}>{user.name}</option> }
			)
	}

	clients({ clients }) {

		if (clients)
			return clients = clients.map((client) => { return <option key={client.id} value={client.id}>{client.name}</option> }
			)
	}

	render() {
		return (
			<form method='POST' className='form m-form' onSubmit={this.filesUpload.bind(this)}>
				<div className="row">
					<div className="col-md-8">


						<div className="project-form form-group row">
							<label className='col-sm-2 col-form-label'>Name</label>

							<input onChange={this.name.bind(this)} value={this.state.name} name='name' id='name' type='text' placeholder='' className='form-control form-control-sm col-sm-8' />
						</div>
						<div className="project-form form-group row">
							<label className='col-sm-2 col-form-label'>Client</label>

							<select onChange={this.client.bind(this)} value={this.state.managerId} name='clientId' id='clientId' type='text' placeholder='' className='form-control form-control-sm col-sm-8' >
								{this.clients(this.props)}
							</select>
						</div>
						<div className="project-form form-group row">
							<label className='col-sm-2 col-form-label'>Manager</label>
							<select onChange={this.manager.bind(this)} value={this.state.managerId} name='managerId' id='managerId' type='text' placeholder='' className='form-control form-control-sm col-sm-8' >
								{this.managers(this.props)}
							</select>
						</div>
						<div className="project-form form-group row">
							<label className='col-sm-2 col-form-label' >Start</label>
							<DatePicker
								name='startdate'
								selected={this.state.startdate}
								className='form-control form-control-sm col-sm-8 col-sm-8'
								onSelect={this.handlestartSelect.bind(this)}
								onChange={this.handlestartChange.bind(this)}
							/>
						</div>
						<div className="project-form form-group row" >
							<label className='col-sm-2 col-form-label'>End</label>
							<DatePicker
								name='enddate'
								selected={this.state.enddate}
								className='form-control form-control-sm col-sm-8 col-sm-8'
								onSelect={this.handleendSelect.bind(this)}
								onChange={this.handleendChange.bind(this)}
							/>
						</div>
						<div className="project-form form-group row">
							<label className='col-sm-2 col-form-label'>Notes</label>
							<textarea onChange={this.description.bind(this)} value={this.state.description} name='descrption' id='descrption' type='text' placeholder='' className='form-control form-control-sm col-sm-8'></textarea>
						</div>

						<button type='submit' className='btn  btn-dark btn-secondary'>Save</button>
						<button type='button' className='btn  btn-dark btn-outline-secondary'
							onClick={() => this.props.changeTab('tab1')}>cancel</button>
					</div>

					<div className="col-md-3">
						<div className="project-form form-group row">
							{/* <label className='col-sm-2 col-form-label'>Files</label> */}
							<Files
								ref='files'
								className='files-dropzone-list'
								style={{ height: '100px' }}
								onChange={this.onFilesChange}
								onError={this.onFilesError}
								multiple
								maxFiles={10}
								maxFileSize={10000000}
								minFileSize={0}
								clickable
							>
								Drop files here or click to upload
        </Files>

							{
								this.state.files.length > 0
									? <div className='files-list'>
										<ul>{this.state.files.map((file) =>
											<li className='files-list-item' key={file.id}>
												<div className='files-list-item-preview'>
													{file.preview.type === 'image'
														? <img className='files-list-item-preview-image' src={file.preview.url} />
														: <div className='files-list-item-preview-extension'>{file.extension}</div>}
												</div>
												<div className='files-list-item-content'>
													<div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
													<div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
												</div>
												<div
													id={file.id}
													className='files-list-item-remove'
													onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
												/>
											</li>
										)}</ul>
									</div>
									: null
							}
						</div>
					</div>
				</div>

			</form>
		)
	}
}

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ addProject, loadClients, loadUsers }, dispatch)
}

let mapStateToProps = (state) => {
	return {
		clients: state.clients.list,
		users: state.users.list
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)