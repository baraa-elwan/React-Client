import React, { Component } from 'react'



export default class Header extends Component {
    
    constructor(props){
        super(props)
        this.state={
            title: this.props.title,
            classes : 'm-header '+ this.props.className
        }


    }
    
    render() {
        return (
            <div className={this.state.classes} style={this.props.styles}>
                {this.props.back ?this.props.back():''} {this.state.title}
                {this.props.add ?this.props.add():''} 
            </div>
        )
    }
}
