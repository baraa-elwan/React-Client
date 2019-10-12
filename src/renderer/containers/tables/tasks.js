import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "../../../node_modules/react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
// import "../../../node_modules/react-tabulator/lib/styles.css";
import { React15Tabulator } from 'react-tabulator';
import Modal from 'react-awesome-modal';
import TasksForm from '../../containers/forms/task'
import { Redirect } from 'react-router-dom'
import { loadProjectTasks } from '../../../shared/actions/projectActions'

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'


class tasks extends Component {

	constructor(props) {
		super(props);

		this.columns = [
			{ title: "Task", field: "name", align: "left" },
			{
				title: "Due Date", field: "dueDate", align: "left", formatter: function (cell, formatterParam) {
					let value = cell.getValue();
					let date = new Date(value)
					return date.toDateString()
				}
			},
			{
				title: "Users", field: "users", align: "left", formatter: function (cell, formatterParam) {
					let value = cell.getValue();
					// console.log(value)
					return 'users'
				}
			},
			{
				title: "Status", field: "status", align: "left", formatter: function (cell, formatterParams) {
					var value = cell.getValue();
					let badge = ''
					switch (value) {
						case 'pending':
							badge = 'secondary'
							break
						case 'finished':
							badge = 'secondary'
							break
						case 'active':
							badge = 'success'
							break
						case 'overdue':
							badge = 'danger'
							break

					}
					return '<span class="badge badge-' + badge + '">' + value + '</span>'
				}
			},

		];


		this.state = {
			visible: false,
			data: [],
			redirect: ''
		}
	}


	openModal1() {
		this.setState({
			visible1: true
		});
	}

	closeModal1() {
		this.setState({
			visible1: false
		});
	}

	componentWillReceiveProps(nxt) {
		if (nxt.tasks) {
			this.setState({ data: nxt.tasks })
		}
		if (nxt.project) {
			//this.props.loadProjectTasks(nxt.project.id)
		}
	}
	select(data, rows) {
		console.log(rows.getData().id)
		this.redirect(rows.getData().id)
	}

	redirect(id) {
		this.setState({ redirect: <Redirect to={`/tasks/${id}`} /> })
	}

	render() {
		return (
			<div className='m-table'>
				{this.state.redirect}

				<React15Tabulator columns={this.columns} data={this.state.data}
					selectable
					className='custom-height1'
					rowClick={this.select.bind(this)} />

				<Modal visible={this.state.visible1} width="600" height="600" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
					<TasksForm close={this.closeModal1.bind(this)} />

				</Modal>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
		project: state.projects.details,
		tasks: state.projects.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadProjectTasks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(tasks)