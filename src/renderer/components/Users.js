import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './Header';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Form from '../containers/forms/user'
import { styles } from './styles'
import UsersTable from '../containers/tables/users'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ loadUsers, approveUser, loadRoles }from '../../shared/actions/usersActions'

class Users extends Component {


	constructor(props) {
		super(props)
		this.state = {
			selected : 'tab1'
		}
	}

	componentWillMount() {
		this.props.loadUsers()
		this.props.loadRoles()
	}

	changeSelected(value){
		////console.log(value)
		this.setState({selected:value})
	}

	render() {
		return (
			<div className='col-12 '>
				<div className='m-contents'>


					<Header title='Users' />

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						onChange={tab => this.setState({selected:tab})} // eslint-disable-line no-console
						selectedTab={this.state.selected}

					>
						<div style={styles.links}>
							<TabLink to="tab1" style={styles.tabLink}>
								All Users
								</TabLink>
							{/* <TabLink to="tab2" default style={styles.tabLink}>
								Requests
								</TabLink> */}
							<TabLink to="tab3" style={styles.tabRigth}>
								<FontAwesomeIcon icon='plus-circle' />
							</TabLink>
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">
								<UsersTable type='active' />
							</TabContent>
							{/* <TabContent for="tab2">

								<PUsers type='requests' />

							</TabContent> */}

							<TabContent for="tab3">
								<Form changeTab={this.changeSelected.bind(this)}/>
							</TabContent>
						</div>
					</Tabs>
				</div>
			</div>

		)
	}
}

let mapStateToProps = (state) => {

	return {
		users: state.users.list,
		roles:state.users.roles
	}
}

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadUsers, approveUser, loadRoles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
