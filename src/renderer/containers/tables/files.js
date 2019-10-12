import React, { Component } from 'react'

import FileBrowser, { FileRenderers, FolderRenderers, Groupers, Icons } from 'react-keyed-file-browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'moment'
import FileDetails from './../details/files'
import Modal from 'react-awesome-modal';

import '../../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {clientFiles} from '../../../shared/actions/clientActions'
import {projectFiles} from '../../../shared/actions/projectActions'

class files extends Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            files:[
                
            ]
        }

    }
    componentWillMount(){
        console.log(this.props)
        if(this.props.type === 'c'){
            console.log('client')
            this.props.clientFiles(this.props.id)
        }
        else if(this.props.type === 'p'){
            this.props.projectFiles(this.props.id)
        }  
        else  
          this.props.projectFiles(45)


    }

    componentWillReceiveProps(next) {
        if(next.files){
           let files =  next.files.map(file=>{
               return {
                   key: file.project.name+"/"+file.name,
                   modified: +Moment().subtract(file.id, 'days'),
                   size: '5 MB'

               }
           })
           this.setState({files})
        }
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


    render() {
        return (
            <div className='m-files'>

                <FileBrowser
                    files={this.state.files}
                    icons={{
                        File: <FontAwesomeIcon icon='file' />,
                        Image: <FontAwesomeIcon icon='file-image' />,
                        PDF: <FontAwesomeIcon icon='file-pdf' />,
                        Rename: <FontAwesomeIcon icon='i-cursor' />,
                        Folder: <FontAwesomeIcon icon='folder' />,
                        FolderOpen: <FontAwesomeIcon icon='folder-open' />,
                        Delete: <FontAwesomeIcon icon='trash' />,
                        Loading: <FontAwesomeIcon icon='circle-notch' />,
                    }}

                    onSelectFile={()=>this.openModal()}
                    detailRenderer={()=>{return null}}
                />

                <Modal visible={this.state.visible} width="600" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <FileDetails close={this.closeModal.bind(this)}/>

                    </div>

                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		files: state.files.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ clientFiles, projectFiles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(files)