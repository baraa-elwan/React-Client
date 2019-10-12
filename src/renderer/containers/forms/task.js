import React, { Component } from 'react'

//components
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/Header'
import Files from 'react-files'
import FormData from 'form-data'
import Select from 'react-select'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import{ loadProjects }from '../../../shared/actions/projectActions'
import{ loadUsers }from '../../../shared/actions/usersActions'
import{ addTask }from '../../../shared/actions/taskActions'

//styles
const styles = {
	header: {
		padding: '15px',
		borderBottom: '#f1f1f1 solid 1px',
		fontSize: '13px'
	}
}

class TaskForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			description: '',
			startdate: new Date(),
			enddate: new Date(),
			files: [],
			users: [],
			selectedUsers:[],
		};

		this.form = new FormData();
		this.form.append('description', this.state.description)
		this.form.append('projectId', this.state.projectId)

		this.form.append('dueDate', this.state.enddate)

		this.form.append('startDate', this.state.startdate)
		this.form.append('projectId', this.state.projectId)
		this.form.append('users', this.state.selectedusers)
		
	}

	onFilesChange = (files) => {
		this.setState({
			files
		}, () => {
		})
	}

	onFilesError = (error, file) => {
	}

	filesRemoveOne = (file) => {
		this.refs.files.removeFile(file)
	}

	filesRemoveAll = () => {
		this.refs.files.removeFiles()
	}

	filesUpload = (e) => {
		e.preventDefault()

		this.form.append('name', this.state.name)
		this.form.append('description', this.state.description)
		this.form.append('dueDate', this.state.enddate)
		this.form.append('startDate', this.state.startdate)
		this.form.append('users', this.state.selectedUsers)
		this.form.append('projectId', this.state.projectId)
		//console.log(this.state.files)
		Object.keys(this.state.files).forEach((key) => {
			const file = this.state.files[key]
			this.form.append(key, new Blob([file], { type: file.type }), file.name || 'file')
		})

		this.props.addTask({...this.state,dueDate: this.state.enddate, startDate: this.state.startdate,
			users: this.state.selectedUsers}, this.form)
		this.props.close()
	}

	componentWillMount() {
		//this.props.loadProjects()
		this.props.loadUsers()
	}


	componentWillReceiveProps(next){
		let users = []
		if(next.users){
			users = next.users.map(user=>{
				return   {label: user.name,
                value: user.id}
			})

			this.setState({users})
		}
		if(next.project){
			this.setState({projectId:next.project.id})}
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

	users({ users }) {
		if (users)
			return users = users.map((user) => { return <option key={user.id} value={user.id}>{user.name}</option> }
			)
	}

	projects({ projects }) {
		if (this.props.project) {
			
			return <option key={this.state.projectId} value={this.state.projectId} disabled selected>{this.props.project.name}</option>
		}
		else if (projects)
			return projects = projects.map((project) => { return <option key={project.id} value={project.id}>{project.name}</option> })
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.addTask(this.state)
	}

	handleUserSelect(opts){
		let selectedUsers = opts.map(opt=>{
			return  opt.value
		})
		this.setState({selectedUsers})
	}
	render() {
		return (
			<div className='m-file-details m-task-form'>
				<button className='btn btn-outline-secondary btn-dark btn-sm' style={{ float: 'right' }}
					onClick={() => { this.props.close() }}><FontAwesomeIcon icon='times' /></button>
				<Header title='New Task' className='text-secondary' styles={styles.header} />

				<form method='POST' className='form' onSubmit={this.filesUpload.bind(this)}>

					<input className='form-control form-control-sm ' name='title' placeholder='title'
						onChange={(e) => { this.setState({ name: e.target.value }); }} />

					<textarea className='form-control form-control-sm ' name='description' placeholder='Description' rows='10'
						onChange={(e) => { this.setState({ description: e.target.value }) }}></textarea>
					< Select 
					options={this.state.users}
					className='multi-select'
					isMulti 
					onChange={this.handleUserSelect.bind(this)}
					/>

					<DatePicker
						name='startdate'
						placeholder='From'
						selected={this.state.startdate}
						className='form-control form-control-sm col-sm-8 col-sm-8'
						onSelect={this.handlestartSelect.bind(this)} 
						onChange={this.handlestartChange.bind(this)} 
					/>

					<DatePicker
						name='enddat'
						placeholder='From'
						selected={this.state.enddate}
						className='form-control form-control-sm col-sm-8 col-sm-8'
						onSelect={this.handleendSelect.bind(this)} 
						onChange={this.handleendChange.bind(this)} 
					/>

					<select className='form-control form-control-sm'
						onChange={(e) => { this.setState({ projectId: e.target.value }) }}>
						{this.projects(this.props)}

					</select>

					<Files
						ref='files'
						className='files-dropzone-list form-control form-control-sm '
						style={{ height: '40px' }}
						onChange={this.onFilesChange}
						onError={this.onFilesError}
						multiple
						maxFiles={10}
						maxFileSize={10000000}
						minFileSize={0}
						clickable
					>
						{this.state.files.length > 0
							? <div className='files-list1 col-12'>
								<ul>{this.state.files.map((file) =>
									<li className='files-list1-item' key={file.id}>

										<div
											id={file.id}
											className='files-list1-item-remove'
											onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
										/>
										<div className='files-list1-item-content'>
											<div className='files-list1-item-content-item files-list1-item-content-item-1'>{file.name}</div>
										</div>

									</li>
								)}</ul>
							</div>
							: <FontAwesomeIcon icon='plus-circle' />
						}
					</Files>
					<div className='row'>


					</div>

					<button type='submit' className='btn btn-sm btn-success form-control'>save</button>
				</form>
			</div>

		)
	}
}

const mapStateToProps = (state) => {

	return {
		users: state.users.list,
		projects: state.projects.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadProjects, loadUsers, addTask }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
