import React, { Component } from 'react'

//components

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//action creator

//components
import ProjectsTable from '../containers/tables/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './Header';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Form from '../containers/forms/project'

//styles
import { styles } from './styles'
import './Projects.css'
import './ProjectsList.css'
import '../tabs.css'

import{ loadProjects }from '../../shared/actions/projectActions'


class Projects extends Component {


	constructor(props) {
		super(props);
		this.state = {
			selected: 'tab2'
		}
	}

	componentWillMount() {
		// this.props.loadProjects()
	}


	handleChangeTab(selectredTab, name) {
		// if (selectredTab == 'tab2') {
		// 	// selectredTab = 'tab1'
		// 	this.props.loadProjects(2)
		// }
		// else if(selectredTab === 'tab1'){
		// 	this.props.loadProjects(1)

		// }
		this.setState({ selected: selectredTab })

	}

	changeTab(tab) {
		//console.log('Selected' + tab)
		this.setState({ selected: tab })
	}


	render() {
		return (

			<div className='col-12 '>
				<div className='m-contents'>


					<Header title='Projects' />

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						// onChange={this.handleChangeTab.bind(this)} 
						selectedTab={this.state.selected}
						handleSelect={this.handleChangeTab.bind(this)}
					>

						<div style={styles.links}>
							{/* <TabLink to="tab1" style={styles.tabLink} default>
								My Projects
        					</TabLink> */}
							<TabLink to="tab2" style={styles.tabLink}>
								All 
        					</TabLink>
							<TabLink to="tab3" style={styles.tabRigth}>
								<FontAwesomeIcon icon='plus-circle' />
							</TabLink>
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">
								<ProjectsTable />
							</TabContent>
							<TabContent for="tab2">
								<ProjectsTable />
							</TabContent>
							<TabContent for="tab3">
								<Form changeTab={this.changeTab.bind(this)} />
							</TabContent>
						</div>
					</Tabs>
				</div>
			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({loadProjects}, dispatch)
}

export default connect(null, mapDispatchToProps)(Projects)