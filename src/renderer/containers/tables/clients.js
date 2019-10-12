import React, { Component } from 'react'


//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadClients } from '../../../shared/actions/clientActions'

//components
import { React15Tabulator, reactFormatter } from 'react-tabulator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'
const styles = {
    'fontSize': '12px',
    'color': '#a3a3a3',
    'textDecorationLine': 'underline'
}

class clients extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            { title: "Client", field: "name", align: "left", },
            {
                title: "Branch", field: "client", align: "left", formatter: function (cell, formatterParam) {

                    return 'Damascus'
                }
            },
            {
                title: "Projects", field: "projects", align: "left", formatter: function (cell, formatterParam) {
                    let value = cell.getValue();
                    if (value)
                        return value.length
                }
            },
            // {
            // 	title: "", field: "id", align: "right", formatter: reactFormatter(<Details redirect={this.redirect.bind(this)} />)
            // },
        ];

        this.state = {
            data: [],
            redirect: ''
        }
    }

    redirect(id) {
        this.setState({ redirect: <Redirect to={`/clients/${id}`} /> })
    }

    componentWillMount() {
        this.props.loadClients()
    }

    componentWillReceiveProps(next){
        if(next.clients)
            this.setState({data:next.clients})
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
                    className=' custom-height2 m-table'
                    selectable
                    rowClick={this.select.bind(this)} />
            </>

        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.clients.list)
    return {
        clients: state.clients.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadClients }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(clients)

