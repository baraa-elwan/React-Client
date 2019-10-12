import React, { Component } from 'react'
import Files from 'react-files'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class files extends Component {

    constructor(props) {
        super(props);
        this.state={
            files: []
        }        

    }

    onFilesChange = (files) => {
	    this.props.setFiles(files)
	}

	onFilesError = (error, file) => {
		//console.log('error code ' + error.code + ': ' + error.message)
	}

	filesRemoveOne = (file) => {
		this.refs.files.removeFile(file)
	}

	filesRemoveAll = () => {
		this.refs.files.removeFiles()
	}

    render() {
        return (
            <div className="project-form form-group row">
                {/* <label className='col-sm-2 col-form-label'>Files</label> */}
                <Files
                    ref='files'
                    className={/*'files-dropzone-list form-control form-control-sm col-sm-8'*/ this.props.className}
                    style={{ height: '40px' }}
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    multiple
                    maxFiles={10}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    <FontAwesomeIcon icon='plus-circle' /> Add Files
            </Files>
                {
                    this.state.files.length > 0
                        ? <div className='files-list'>
                            <ul>{this.state.files.map((file) =>
                                <li className='files-list-item' key={file.id}>
                                    <div className='files-list-item-preview'>
                                        {file.preview.type === 'image'
                                            ? <img className='files-list-item-preview-image' src={file.preview.url} />
                                            : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                                    </div>
                                    <div className='files-list-item-content'>
                                        <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                        <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                    </div>
                                    <div
                                        id={file.id}
                                        className='files-list-item-remove'
                                        onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                    />
                                </li>
                            )}</ul>
                        </div>
                        : null
                }

            </div>

        )
    }
}
