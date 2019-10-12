import React, { Component } from 'react'

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
//styles

import './Sidebar.css'

import logo from '../logo-s.png'

const style ={
	link:{
	'textDecoration': 'none'
},
	li:{
		'background': '#fff',
		'color': '#333435'

	}
}

class Sidebar extends Component {


	constructor(props) {
		super(props);
		this.state={
			// elems:[style.link, null, null, null, null, null ,null],
			elems:[style.li, null, null, null, null, null ,null],

			active : 0
		}
	}
	
	changeTab(tab){
		//console.log(tab)
		let active = this.state.active
		let e = this.state.elems
		e[active] = null
		active = tab
		e[active] = style.li
		this.setState({active})
		this.setState({elems:e})
	}

	render() {
		return (

			<nav id="sidebar">
				<div className="sidebar-header">
				<img src={logo} alt="navbar-logo" />

				</div>

				<ul className="list-unstyled components">

					{ /*Tasks */}
					<li style={this.state.elems[0]}>
						<Link to="/" className="activeTab" style={this.state.elems[0]}
							onClick={()=>{this.changeTab(0)}}> <FontAwesomeIcon icon="tasks" className="icn" /> My Tasks</Link>
					</li>
					{ /*Projects */}
					<li  style={this.state.elems[1]}>
						<Link to="/projects" className="" style={this.state.elems[1]}
							onClick={()=>{this.changeTab(1)}}><FontAwesomeIcon icon="folder-open" className="icn" /> Projects</Link>
					</li >
					{/* <hr/> */}
					{ /*Requests */}
					<li  style={this.state.elems[2]}>
						{/* <Link to='/requests' className=""><FontAwesomeIcon icon="project-diagram" className="icn" /> Requests</Link> */}
						{ /*Clients */}
						<Link to="/clients" className="" style={this.state.elems[2]}
							onClick={()=>{this.changeTab(2)}}> <FontAwesomeIcon icon="users" className="icn" /> Clients</Link>
					</li>
					{ /*Files */}
					<li  style={this.state.elems[3]}>
						<Link to="/files" className="" style={this.state.elems[3]}
							onClick={()=>{this.changeTab(3)}}> <FontAwesomeIcon icon="copy" className="icn" /> Files</Link>
					</li>

					{ /*Users */}
					<li  style={this.state.elems[4]}>
						<Link to="/users" className="" style={this.state.elems[4]}
							onClick={()=>{this.changeTab(4)}}> <FontAwesomeIcon icon="user" className="icn" /> Users</Link>
					</li>
					{/* { /*Users 
					<li>
						<Link to="/new_users" className=""> <FontAwesomeIcon icon="copy" className="icn" /> New Users</Link>
					</li> */}
					{ /*Access Control */}
					<li  style={this.state.elems[5]}>
						<Link to="/roles" className="" style={this.state.elems[5]}
							onClick={()=>{this.changeTab(5)}}> <FontAwesomeIcon icon="lock" className="icn" /> Access Control</Link>
					</li>

					{/* 
					<li style={this.state.elems[6]}>
						<Link to="/reports" className="" style={this.state.elems[6]}
							onClick={()=>{this.changeTab(6)}}> <FontAwesomeIcon icon="chart-bar" className="icn" /> Reports</Link>
					</li> 
					*/}
				</ul>

			</nav>
		)
	}
}

export default Sidebar;
