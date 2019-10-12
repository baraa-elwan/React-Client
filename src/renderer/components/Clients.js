import React, { Component } from 'react'



//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './Header';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Form from '../containers/forms/client';
import ClientsTable from '../containers/tables/clients'

//styles
import {styles} from './styles'
// import "../../../node_modules/react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
// import "../../../node_modules/react-tabulator/lib/styles.css";
import '../tabs.css'

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'


class Clients extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: 'tab1'
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

	render() {
		return (

			<div className='col-12 '>
				<div className='m-contents'>


					<Header title='Clients' />

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						selectedTab={this.state.selected}
						handleSelect={this.handleChangeTab.bind(this)}>

						<div style={styles.links}>
							<TabLink to="tab1" style={styles.tabLink}>
								ALL
        					</TabLink>

							<TabLink to="tab3" style={styles.tabRigth}>
							<FontAwesomeIcon icon='plus-circle'/>  
        					</TabLink>
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">
								<ClientsTable/>
							</TabContent>
							
							<TabContent for="tab3">
								<Form changeTab={this.changeTab.bind(this)}/>
							</TabContent>
						</div>
					</Tabs>
				</div>
			</div>

		)
	}
}

export default Clients