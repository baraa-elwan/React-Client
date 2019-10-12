import React, { Component } from 'react'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//components

import { React15Tabulator } from 'react-tabulator';
import Modal from 'react-awesome-modal';
import EditForm from '../forms/edit-user'
import AcceptForm from '../forms/user-accept'

import { loadUsers, loadPUsers, loadRoles, userEdit } from '../../../shared/actions/usersActions'
import Header from '../../components/Header'
//styles
// import "../../../node_modules/react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
// import "../../../node_modules/react-tabulator/lib/styles.css";

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'

const styles = {
  header: {
    padding: '15px',
    borderBottom: '#f1f1f1 solid 1px',
    fontSize: '13px',
    marginRight: '10px'
  }
}

class users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible1: false,
      visible2: false,

      data:[],
      pdata:[],
      
    }
    

    this.columns = [
      { title: "Name", field: "name", align: "left" },
      { title: "Email", field: "email", align: "left" },
      {
        title: "roles", field: "roles", align: "left", formatter: function (cell, formatterParams) {
          var value = cell.getValue();
          var r = ''
          if (value) {
            value.forEach(element => {

              r += '<i>' + element.name + '</i> '
            });
          }
          else {

          }
          return r
        }
      },


    ];

  }


  openModal1() {
    this.setState({
      visible1: true
    });
  }

  closeModal1() {
    this.setState({
      visible1: false,

    });
  }

  openModal2() {
    this.setState({
      visible2: true
    });
  }

  closeModal2() {
    this.setState({
      visible2: false,

    });
  }
  componentWillMount() {
      this.props.loadPUsers()
      this.props.loadUsers()
  }

  componentWillReceiveProps(next) {
    if (next.users)
      this.setState({ data: next.users })
    if (next.pusers){
      console.log(next.pusers)
      this.setState({ pdata: next.pusers })
    }
    if (next.roles)
      this.setState({ roles: next.roles })


  }

  select(data, rows) {
    console.log(rows.getData().id)
    this.props.userEdit(rows.getData())
    this.openModal1()
  }
  select2(data, rows) {
    console.log(rows.getData().id)
    this.props.userEdit(rows.getData())
    this.openModal2()
  }

  render() {

    return (
      <div className='m-table'>

        <Header title='All users' className='text-secondary' styles={styles.header} />

        <React15Tabulator columns={this.columns} data={this.state.data}  
          selectable
          rowClick={this.select.bind(this)}  
          scroll = {true}
          className='custom-height'/>
      
        
        <Header title='Requests' className='text-secondary' styles={styles.header} />
        <React15Tabulator columns={this.columns} data={this.state.pdata} 
          selectable
          className='custom-header custom-height'
          rowClick={this.select2.bind(this)} />
       


        <Modal visible={this.state.visible1} width="800" height="400" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
          <EditForm close={this.closeModal1.bind(this)} data={this.state.data}/>

        </Modal>

        <Modal visible={this.state.visible2} width="800" height="400" effect="fadeInUp" onClickAway={() => this.closeModal2()}>
          <AcceptForm close={this.closeModal2.bind(this)} data={this.state.data}/>

        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    users: state.users.list,
    pusers: state.users.plist,
    roles: state.users.roles
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loadUsers, loadPUsers, loadRoles , userEdit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(users)