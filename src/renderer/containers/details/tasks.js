import React, { Component } from 'react'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker'

import Header from '../../components/Header';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Files from 'react-files'
import FileDetails from './files'
import Modal from 'react-awesome-modal';
import TasksForm from '../../containers/forms/task'

import{loadTask}from '../../../shared/actions/taskActions'


class tasks extends Component {

    constructor(props) {
        super(props);
        this.state={
            projectId:'',
            name:'',
            description:'',
            visible:false,
            visible1:false,
            name:''
        }
    }

    componentWillMount(){
        this.props.loadTask(this.props.match.params.id)    
    }

    componentWillReceiveProps(next){
        if(next.task)
            this.setState({date:new Date(next.task.dueDate), projectId:next.task.projectId})
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    openModal1() {
        this.setState({
            visible1: true
        });
    }

    closeModal1() {
        this.setState({
            visible1: false
        });
    }
    

    backButton = () => {
        return <Link to={`/projects/${this.state.projectId}`}><FontAwesomeIcon icon='arrow-left' /></Link>
    }

    addButton = () => {
        return <button className='btn btn-link' onClick={()=>this.openModal1()} style={{ float: 'right' }} ><FontAwesomeIcon icon='plus'/></button>
    }

    onFilesChange(files) {
        this.setState({ files })
    }

    
    handlestartChange(date) {
        this.setState({
            date: date,
            changed: true
        });
    }

    handlestartSelect(date) {
        this.setState({
            date: date,
            changed: true
        });
    }
    onSubmit(e){
        e.preventDefaults()
    }

    render() {
        console.log(this.props)
        return (
            <>
            <div className='m-task-details'>
            <div className='m-header ' styles={{ borderBottom: '#eee solid 0.01rem', padding: '20px' }}>
                {this.backButton()}
                {this.props.task?this.props.task.name:''}
                <span className='badge badge-sm'> ({this.props.task?this.props.task.status:''})</span>

                {this.addButton()}

            </div>


                <div class="card" style={{margin:'20px'}}>
                <div class="row" >

                    <div class="col-md-7"><p> {this.props.task?this.props.task.description:''}</p>
                    </div>

                    <div class="col-md-5 m-task-det-meta">
                        <p>Created By: <span>{this.props.task &&  this.props.task.creaedBy?this.props.task.creaedBy.name:'Kamal'}</span></p>

                        <p>Project: <span>{this.props.task && this.props.task.project?this.props.task.project.name:''}</span></p>
{/* 
                        <form method='PUT' className='form' onSubmit={this.onSubmit.bind(this)}>

                            <div className="project-form form-group ">
                                <label className='tt' >Due Date</label>
                                <DatePicker
                                    name='startdate'
                                    selected={this.state.date}
                                    className='form-control form-control-sm '
                                    onSelect={this.handlestartSelect.bind(this)} //when day is clicked
                                    onChange={this.handlestartChange.bind(this)} //only when value has changed
                                />
                            </div>
                        </form> */}

                    </div>
                    
                </div>
                </div>

                <div class="row">
                    <div class="col-md-7 m-task-details-actions">
                        <p>files</p>
                        <button onClick={()=>{this.openModal()}}className='btn btn-link' className='btn btn-link'><FontAwesomeIcon icon='file'/> summary.docx</button>
                        <button onClick={()=>{this.openModal()}}className='btn btn-link' className='btn btn-link'><FontAwesomeIcon icon='file'/> brief.pdf</button>

                        <form className='form form-inline'>
                            <Files
                                className='files-dropzone form-control form-control-sm'

                                onChange={this.onFilesChange.bind(this)}
                                accepts={['image/*', '.pdf', 'audio/*', '.psd']}
                                multiple
                                maxFileSize={10000000}
                                minFileSize={0}
                                clickable
                            >
                                Drop files here or click to upload
     
						</Files>
                            <button className='btn btn-success  btn-sm' type='submit' style={{float:"left"}}><FontAwesomeIcon icon='check'></FontAwesomeIcon></button>
                        </form>


                    </div>
                </div>

              
                        </div>
                          <Modal visible={this.state.visible} width="600" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                              <FileDetails close={this.closeModal.bind(this)} />
        
          
                      </Modal>

                      <Modal visible={this.state.visible1}width="600" height="700" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
                              <TasksForm close={this.closeModal1.bind(this)} />
                    
                      </Modal>
                      </>
        )
    }
}

const mapStateToProps = (state) => {
        return {
		task: state.tasks.details
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({loadTask }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(tasks)