import React, { Component } from 'react'

import './Tasks.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { loadTasks } from '../../shared/actions/taskActions'
import TasksScheduler from './TasksScheduler';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Header from './Header';
import { styles } from './styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Tasks extends Component {

	constructor(props) {
		super(props);
		this.state={
			selectedTab:'tab1'
		}
	}
	

	componentWillMount() {
		this.props.loadTasks();
	}

	render() {
		return (
			<div className='col-md-12'>
				<div className='m-contents' style={{padding:'40px'}}>


					<Header title=''/>

					

								<TasksScheduler />
						
					
				</div>
			</div>


		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadTasks }, dispatch)
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks.list
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)