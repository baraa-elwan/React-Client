import React, { Component } from 'react'

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link , Redirect} from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {logout} from '../../shared/actions/login'
//styles
import "jquery/dist/jquery.min";
import "bootstrap/dist/js/bootstrap.min";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Topbar.css'

let rowStyle = {

  'color': '#343a40',
  'paddingRight': '10px'
}

class Topbar extends Component {


  constructor(props){
    super(props)
    this.state={
      name:''
    }
  }





  render() {
    return (



      <nav className="navbar navbar-expand-lg navbar-light ">

        <div className=" row container-fluid">

          <div className='col-sm-6 col-md-8'>

            <form className="form">
              <div className="input-group">
                <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" />
              </div>
            </form>
          </div>
          {/*Nav Icons */}

          <div className="pull-right">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a href='#' className='topbar-link nav-link' style={rowStyle}>
                    <FontAwesomeIcon icon="user" className="topbar-icn" /> Kamal
                  </a>
                </li>

                {/* Notifications */}
                <li className="nav-item active">  <a href='#' className='topbar-link nav-link'>
                  <FontAwesomeIcon icon="bell" className="topbar-icn" />
                </a>
                </li>
                <li className="nav-item active">
                  {/* Logout */}
                  <a href='#' className='topbar-link nav-link' onClick={()=>{this.props.logout()}}>
                    <FontAwesomeIcon icon="sign-out-alt" className="topbar-icn" />
                  </a>
                </li>
              </ul>

            </div>



          </div>
        </div>

      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state.settings.userData)
  return {user:state.settings.userData}
}

const mapDispatchToProps =(dispatch) =>{
  return bindActionCreators({logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Topbar)
