import React, {Component} from 'react'
import {modal , changeDescription , search, clear} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 

import Modal from '../modal/modal'

class Form extends Component {

    render() {
        return (
            <div className={'container-fluid formulario'} >
                <div className={'container'} >
                    <div className={'col-xs-12'} >
                        <form>
                            <div className={'col-md-2 col-sm-2 col-xs-12 logo'} style={{padding: '0'}}>
                                <h2 style={{margin: '0'}}><i class="fas fa-search logo"></i> Form </h2>
                            </div>
                            <div className={'col-md-6 col-sm-6 col-xs-12'} style={{padding: '0'}}>
                                <input type="email" className={"form-control input-txt-form"} id="exampleInputEmail1" placeholder="Escreva algo" style={{width: '100%'}} onChange={this.props.changeDescription} value={this.props.name}/>
                            </div>
                            <div className={'col-md-4 col-sm-4 col-xs-12'} style={{padding: '0'}}>
                                <input type="button" className={"form-control btn-form btn-form-1"} id="exampleInputPassword1" placeholder="Password" value="add" style={{width: '32.3%', margin: '0 0 0 1%', float: 'left'}} onClick={() => this.props.modal(this.props.item , 'add')} />
                                <input type="button" className={"form-control btn-form btn-form-2"} id="exampleInputPassword1" placeholder="Password" value="search" style={{width: '32.3%' , margin: '0 1%', float: 'left'}} onClick={() => this.props.search(this.props.name)} />
                                <input type="button" className={"form-control btn-form btn-form-3"} id="exampleInputPassword1" placeholder="Password" value="clean" style={{width: '32.3%', float: 'left'}} onClick={() => this.props.clear()}/> 
                            </div>
                        </form>
                        <Modal />
                    </div>
                </div>
            </div>
        )
    }
    
}


const mapStateToProps = state => ({lista: state.todo.list , name: state.todo.name, item: {name: state.todo.name}})
const mapDispatchToProps = dispatch => 
    bindActionCreators({modal, changeDescription , search, clear}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)