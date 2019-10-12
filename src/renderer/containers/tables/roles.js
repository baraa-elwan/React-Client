import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "../../../node_modules/react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
// import "../../../node_modules/react-tabulator/lib/styles.css";
import { React15Tabulator } from 'react-tabulator';
import Modal from 'react-awesome-modal';

import { loadRoles, roleEdit } from '../../../shared/actions/usersActions'

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'


class roles extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            { title: "Role", field: "name", align: "left" },
            {
                title: "Description", field: "description", align: "left", 
                // formatter: function (cell, formatterParam) {
                //     let value = cell.getValue();
                //     // console.log(value)
                //     return 'users'
                // }
            }
        ];


        this.state = {
            visible: false,
            data: []
        }
    }


    componentWillReceiveProps(nxt) {
        if (nxt.roles) {
            this.setState({ data: nxt.roles })
        }

    }
    componentWillMount() {
        this.props.loadRoles()
    }

    select(data, rows) {
        this.props.roleEdit(rows.getData())
        this.props.changeTab('tab3')
    }


    render() {
        return (
            <div className='m-table'>

                <React15Tabulator
                    columns={this.columns}
                    data={this.state.data}
                    selectable
                    rowClick={this.select.bind(this)} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        roles: state.users.roles
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadRoles, roleEdit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(roles)