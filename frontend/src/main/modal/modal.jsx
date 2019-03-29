import React, {Component} from 'react'
import ReactModal from 'react-modal'
import {modal} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddModal from './modalAdd'
import EditModal from './modalEdit'
import RemoveModal from './modalRemove'

class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectValue: null
        }
    }

    render() {
        return (
            <ReactModal isOpen={this.props.contents.isOpen} className={'Modal'} ariaHideApp={false}>
                { 
                    this.props.template === 'edit'?
                        this.props.contents.content ? 
                            <EditModal content={this.props.contents.content} lista={this.props.lista} />    
                        : null 
                    : this.props.template === 'add' ?
                        <AddModal content={this.props.contents.content} lista={this.props.lista}/>
                    : this.props.template === 'remove' ?
                        <RemoveModal content={this.props.contents.content} />
                    :null
                }
                <div className={'col-xs-12'} >
                    <div className={'col-xs-12'} >
                        <button onClick={() => this.props.modal('')}>Close Modal</button>
                    </div>
                </div>
            </ReactModal>
        )
    }
}

const mapStateToProps = state => ({contents: state.todo.modal , template: state.todo.modal.template, lista: state.todo.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ modal }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Modal)