import React, {Component} from 'react'
import {modal, add} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class addModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectValue: null
        }
        this.setValue = this.setValue.bind(this)
    }

    setValue(e) {
        this.setState ({
            selectValue: parseInt(e.target.value)
        })
    }
    
    render() {
        return ( 
            <div className={'col-xs-12 noPad'} >
                <div className={'col-xs-12'} >
                    <p>{this.props.content.name }</p>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <p>Subcategoria</p>
                    <select style={{width: '100%'}} onChange={this.setValue}>
                        <option value={null}>Nenhuma</option>
                        {
                            this.props.lista.map((a) => {
                               
                                    return <option value={a.id}>{a.name}</option>
                                
                            })
                        }
                    </select>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <p>Ícone</p>
                    <select style={{width: '100%'}}>
                    </select>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <button onClick={() => this.props.add(this.props.content.name , this.state.selectValue)}>add</button>
                </div>
            </div>        
        )
    }
}

const mapStateToProps = state => ({contents: state.todo.modal})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ modal , add}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(addModal)
