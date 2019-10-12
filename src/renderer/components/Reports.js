import React, { Component } from 'react'

//components

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//styles
import { styles } from './styles'


import Header from './Header';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import '../tabs.css'
import{ loadProjects }from '../../shared/actions/projectActions'

const options = {
	width: '100%'
}

class Reports extends Component {


	constructor(props) {
		super(props);

	}

	componentWillMount() {
		//this.props.loadProjects()
	}

	render() {
		return (

			<div className='col-12 '>
				<div className='m-contents'>


					<Header title='Reports' />

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						onChange={tab => console.log(`Tab selected: ${tab}`)} // eslint-disable-line no-console
						selectedTab={'tab1'}

					>
						<div style={styles.links}>
							<TabLink to="tab1" style={styles.tabLink}>
								Projects
        					</TabLink>
							<TabLink to="tab2" default style={styles.tabLink}>
								Clients
        					</TabLink>
							<TabLink to="tab3" style={styles.tabLink}>
								Users
							</TabLink>
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">
								{/* <ProjectsTable /> */}
							</TabContent>
							<TabContent for="tab2">
								{/* <ProjectsTable /> */}
							</TabContent>

							<TabContent for="tab3">
								{/* <Form /> */}
							</TabContent>
						</div>
					</Tabs>
				</div>
			</div>
			// <div id="plain-react">

			// </div>
		)
	}
}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
		projects: state.projects.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)