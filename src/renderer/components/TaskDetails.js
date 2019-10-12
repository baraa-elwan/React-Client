import React, { Component } from 'react'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import{loadTask}from '../../sharedtaskActions'

//styles
import './TaskDetails.css'
class TaskDetails extends Component {
	
	componentWillMount(){
		this.props.loadTask(this.props.match.params.id)
		//console.log(this.props.task)
	}

	renderData = ()=>{
		if(this.props.task)
			return this.props.task.name
		return ''
	}

	render() {
		return (

						 <tasks/>
		)
	}
}
const mapStateToProps = (state)=>{
	return {
		task :state.tasks.details
	}
}

const mapDispatchToProps =(dispatch)=>{
	return bindActionCreators({loadTask}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
