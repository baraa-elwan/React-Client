import React, { Component } from 'react'

import FileDetails from '../containers/details/files'
import Modal from 'react-awesome-modal';

export default class modal extends Component {
   
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

    }

    componentDidMount() {

    }

    openModal() {
        this.setState({
            visible: this.props.visible
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

   
    render() {
        return (
            <Modal visible={this.state.visible} width="600" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    <FileDetails close={this.closeModal.bind(this)} />

                </div>

            </Modal>
        )
    }
}
