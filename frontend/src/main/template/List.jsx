import React, {Component} from 'react'
import {modal, remove} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 

import Modal from '../modal/modal'

class List extends Component {

    constructor(props) {
        super(props)
        this.renderChildren = this.renderChildren.bind(this) 
        this.state = { 
            isOpen: false, 
            content: ""
        }
    }
 
    renderChildren(names , endLine) {
        if(names.childNodes) {
            return  <li>
                        {
                            endLine? 
                                <div className={'endLine'}></div>
                            :<div className={'line'}></div>
                        }
                        <hr className={'divisor'}/> <div className={'txt'}>{names.name}
                        <button className={'btn-list'} onClick={() => this.props.modal(names, 'edit')}><i className={'fa fa-edit'} /></button>
                        <button className={'btn-list'} onClick={() => this.props.modal(names, 'remove')}><i className={'fa fa-trash-alt'} /></button>
                        </div>
                        <ul >{names.childNodes.map((a , b , c) => {
                            return b !== c.length - 1?
                                this.renderChildren(a)
                            : this.renderChildren(a , 'endLine')
                        })}</ul>
                    </li>
        } else {
            return <li><span>{names.name}</span></li>
        }
    }

    render() {
        return (

            <div className={'container-fluid'} >
                <div className={'container'} >
                    <div className={'col-xs-12'} >
                        <ul>
                            { 
                                this.props.lista?
                                    !this.props.isSearch?
                                        this.props.lista.filter((aa) => {
                                            return aa.parentId === null
                                        }).map((a, b, c) => {
                                            return a !== c.length?
                                                this.renderChildren(a)
                                            :this.renderChildren(a, 'endLine')
                                        })
                                    : this.props.lista.map((a) => {
                                        return <li>{a.name}</li>
                                    })
                                : null
                            }
                        </ul>
                        <Modal />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({edit: state.todo.isEdit , ModalOp: state.todo.modal , isSearch: state.todo.isSearch })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ modal , remove}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(List)