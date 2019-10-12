import React, { Component } from 'react'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action creator
import FilesTable from '../containers/tables/files'
import TaskTable from '../containers/tables/tasks'
//styles
import './Projects.css'
import Modal from 'react-awesome-modal';
import TasksForm from '../containers/forms/task'
import './ProjectsList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import{ loadProject, loadProjectTasks }from '../../shared/actions/projectActions'

import '../tabs.css'
import ProjectGantt from './ProjectGantt';
import ProjectInfo from '../containers/details/projects';
import {styles} from './styles'
import '../../../node_modules/react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import '../../../node_modules/react-tabulator/lib/styles.css'


class ProjectDetails extends Component {

	
	constructor(props) {
		super(props);
	
		this.state={
			visible1:false
		}
		}
	  

	componentWillMount() {
		console.log('HH')
		this.props.loadProject(this.props.match.params.id)

	}

	componentWillReceiveProps(nxt){
		if(nxt.project)
			this.props.loadProjectTasks(nxt.project.id)
	}
	name() {
		if (this.props.project)
			return this.props.project.name
	}
	startdate() {
		if (this.props.project)
			return this.props.project.startdate
	}
	enddate() {
		if (this.props.project)
			return this.props.project.enddate
	}

	descrption() {
		if (this.props.project)
			return this.props.project.descrption
	}

	client() {
		if (this.props.client)
			return this.props.client
	}

	manager() {
		if (this.props.manager)
			return this.props.manager
	}

	id() {
		if (this.props.project)
			return this.props.project.id
	}


	add(){
		return         <button className='btn btn-outline-secondary btn-dark' onClick={()=>this.openModal1()} style={{ float: 'right' }} ><FontAwesomeIcon icon='plus'/> New Task</button>;
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
	
	render() {
		return (

			<div className='col-12 '>
				<div className='m-contents'>

				<div className='m-header ' >
				{this.props.project?this.props.project.name:''}
				{this.add()}
                
            	</div>

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						onChange={tab => console.log(`Tab selected: ${tab}`)} // eslint-disable-line no-console
						selectedTab={'tab2'}
					>
						<div style={styles.links}>
							<TabLink to="tab1" style={styles.tabLink}>
								Info
        					</TabLink>
							<TabLink to="tab2" default style={styles.tabLink}>
								Tasks
        					</TabLink>
							<TabLink to="tab3" default style={styles.tabLink}>
								Files
        					</TabLink>
							<TabLink to="tab4" default style={styles.tabLink}>
								Gantt Chart
        					</TabLink>
							{/* <TabLink to="tab5" style={styles.tabRigth}>
								<FontAwesomeIcon icon='edit' />
							</TabLink> */}
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">

								<ProjectInfo project={this.props.project}/>
							</TabContent>
							<TabContent for="tab2">
								<TaskTable/>
							</TabContent>
							<TabContent for="tab3">

								<FilesTable id={this.props.match.params.id} type='p'/>
							</TabContent>
							<TabContent for="tab4">
								{/* <ProjectGantt/> */}
							</TabContent>
						</div>
					</Tabs>
				</div>

				
				<Modal visible={this.state.visible1} width="600" height="700" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
                    <TasksForm close={this.closeModal1.bind(this)} project={this.props.project} />
                    
                </Modal>
	  
			</div>
		)
	}
}

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadProject, loadProjectTasks }, dispatch)
}

let mapStateToProps = (state) => {
	console.log(state.projects)
	return {
		project: state.projects.details,

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)