import React, { Component } from 'react'
import './App.css'
import Topbar from './Topbar'
import { Redirect } from 'react-router-dom'


import Sidebar from './Sidebar'

import { checkLogin , getUser} from '../../shared/actions/appActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DragDropContext from './withDnDContext'
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: ''
		}
	}


	componentWillMount() {
		this.props.checkLogin('login')
		this.props.getUser()
	}

	componentWillReceiveProps(next){
		if(next.loggedIn && next.loggedIn === 'no'){
			//console.log('dddd')
			this.setState({loggedIn:<Redirect to='/login'/>})
		}
	}


	render() {

		return (
			<div className="wrapper">
				{this.state.loggedIn}
				<Sidebar />


				<div id="content">

					<Topbar /> 

					{this.props.children}
				</div>
			</div >
		)
	}
}

const mapStateToProps = state => {
	//console.log(state)
	return { loggedIn: state.settings.loggedIn , user:state.userData}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ checkLogin, getUser }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(App))
