import React, { Component } from 'react'

//redux
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//components
import { React15Tabulator, reactFormatter } from 'react-tabulator';
import { Link, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{ loadProjects }from '../../../shared/actions/projectActions'

//styles

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'


const styles = {
	'fontSize': '12px',
	'color': '#a3a3a3',
	'textDecorationLine': 'underline'
}



class projects extends Component {



	constructor(props) {
		super(props);
		this.columns = [


			{ title: "Project", field: "name", align: "left", },
			{
				title: "Client", field: "client", align: "left", formatter: function (cell, formatterParams) {
					var value = cell.getValue();
					if (value)
						return value.name
				}
			},
			{
				title: "Manager", field: "manager", align: "left", formatter: function (cell, formatterParams) {
					var value = cell.getValue();
					if (value)
						return value.name


				}
			},
			{
				title: "Due Date", field: "enddate", align: "left", formatter: function (cell, formatterParams) {
					var value = cell.getValue();
					let d = new Date(value)
					return d.toDateString()
				}
			},
			{
				title: "Status", field: "status", align: "left", formatter: function (cell, formatterParams) {
					var value = cell.getValue();
					let badge = ''
					switch (value) {
						case 'pending':
							badge = 'secondary'
							break
						case 'finished':
							badge = 'secondary'
							break
						case 'active':
							badge = 'success'
							break
						case 'overdue':
							badge = 'danger'
							break

					}
					return '<span class="badge badge-' + badge + '">' + value + '</span>'
				}
			},
			// {
			// 	title: "", field: "id", align: "right", formatter: reactFormatter(<SimpleButton redirect={this.redirect.bind(this)} />)
			// },
		];
		this.state = {
			data: [],
			redirect: '',
			id:null
		}
	}

	componentWillReceiveProps(next) {
		if (next.projects) {
			let data = next.projects
			console.log(next.id)
			if(next.id)
				data = next.projects.filter(p => p.clientId == next.id)
			console.log(data)
			this.setState({ data })
			//console.log(this.state.data)
		}
		if(next.id)
			this.setState({id:next.id})

	}
	componentWillMount() {
		this.props.loadProjects(this.state.id)
	}

	redirect(id) {
		this.setState({ redirect: <Redirect to={`/projects/${id}`} /> })
	}

	select(data, rows) {
        console.log(rows.getData().id)
        this.redirect(rows.getData().id)
    }

	render() {
		return (

			<>
				{this.state.redirect}
				<React15Tabulator 
					columns={this.columns} 
					data={this.state.data} 
					className='m-table' 
					selectable
                    rowClick={this.select.bind(this)} />
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loadProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(projects)