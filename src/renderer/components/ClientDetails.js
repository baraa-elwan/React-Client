import React, { Component } from 'react'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// import './ClientDetails.css'
// import './Clients.css'


import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { styles } from './styles'
import ProjectsTable from '../containers/tables/projects'
import FilesTable from '../containers/tables/files'
import Form from '../containers/forms/client';

import{ loadClient }from '../../shared/actions/clientActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ClientDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: 'tab2'
		}
	}


	handleChangeTab(selectredTab, name) {
		if (selectredTab == 'tab2') {
			// selectredTab = 'tab1'
			// this.props.loadProjects(2)
		}
		else if(selectredTab === 'tab1'){
			// this.props.loadProjects(1)

		}
		this.setState({ selected: selectredTab })

	}

	changeTab(tab) {
		//console.log('Selected' + tab)
		this.setState({ selected: tab })
	}

	componentWillMount() {
		this.props.loadClient(this.props.match.params.id)
	}

	render() {
		return (
			<div className='col-12 '>
				<div className='m-contents'>

					<div className='m-header ' >
						{this.props.client ? this.props.client.name : ''}

					</div>
					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						selectedTab={this.state.selected}
						handleSelect={this.handleChangeTab.bind(this)}
					>
						<div style={styles.links}>
							{/* <TabLink to="tab1" style={styles.tabLink}>
								Info
							</TabLink> */}
							<TabLink to="tab2" default style={styles.tabLink}>
								Projects
							</TabLink>
							<TabLink to="tab3" default style={styles.tabLink}>
								Files
							</TabLink>
							<TabLink to="tab4" default style={styles.tabRigth}>
								<FontAwesomeIcon icon='edit'/>
							</TabLink>
						</div>

						<div style={styles.content}>
							{/* <TabContent for="tab1">
								<Form type='info' id={this.props.match.params.id} />
							</TabContent> */}
							<TabContent for="tab2">
								<ProjectsTable id={this.props.match.params.id}/>
							</TabContent>
							<TabContent for="tab3">
								<FilesTable id={this.props.match.params.id} type='c'/>
							</TabContent>
							<TabContent for="tab4">
								<Form type='info' 
										id={this.props.match.params.id} 
										changeTab = {this.changeTab.bind(this)}/>
							</TabContent>

						</div>
					</Tabs>

				</div>
			</div>
		)
	}
}

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadClient }, dispatch)
}

let mapStateToProps = (state) => {
	////console.log(state.clients.details)
	return {
		client: state.clients.details
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails)