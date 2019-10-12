import React, { Component } from 'react'
import Header from '../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Files from 'react-files'


const styles = {
    header: {
        padding: '15px',
        borderBottom: '#f1f1f1 solid 1px',
        fontSize: '13px'
    }
}
export default class files extends Component {

    constructor(props){
        super(props)
        this.state={
            file:null
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(next){
        
    }

    onFilesChange(files) {
        this.setState({ files })
    }


    render() {
        return (
            <div className='m-file-details'>
                <button className='btn btn-outline-secondary btn-dark btn-sm' style={{float:'right'}}
                onClick={()=>{this.props.close()}}><FontAwesomeIcon icon='times'/></button>
                <Header title='File Name' className='text-secondary' styles={styles.header} />

                <div className='row'>
                    <div className="col-md-6">
                        <p>Project: <span>Samsung</span></p>

                        <p>CLient: <span>SAMSUNG</span></p>

                        <p>Type: <span>PDF</span></p>

                        <p>Size: <span>250MB</span></p>

                    </div>

                    <div className="col-md-6">
                        <p>Last Modified: <span>PDF</span></p>
                        <p>By: <span>Baraa</span></p>

                        <p>Version: <button className='btn btn-sm btn-outline-secondary btn-dark'><FontAwesomeIcon icon='download' /></button>
                            <span><select className='form-control form-control-sm'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select></span></p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <p> <FontAwesomeIcon icon='file-upload' /> Upload</p>
                        <form className='form'>
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

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
