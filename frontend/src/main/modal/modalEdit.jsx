import React, {Component} from 'react'
import {modal, edit} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class editModal extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            selectValue: null,
            name: this.props.content.name
        }
        this.setValue = this.setValue.bind(this)
        this.setName = this.setName.bind(this)
    }

    setValue(e) {
        this.setState ({
            selectValue: parseInt(e.target.value)
        })
    }

    setName(e) { 
        this.setState ({
            name: e.target.value
        })       
    }

    render() {
        const ObjtPai = this.props.lista.filter((a) => {
            return a.id === this.props.content.parentId
        })

        return(
            <div className={'col-xs-12'} >
                <div className={'col-xs-12'} >
                    <input style={{width: '100%'}} value={this.state.name} onChange={this.setName}/>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <p>Subcategoria</p>
                    <select style={{width: '100%'}} onChange={this.setValue}>
                        {ObjtPai[0] !== undefined? <option value={null}>sem pai</option>:null}
                        <option value={ObjtPai[0] === undefined? null: ObjtPai[0].id} selected>
                            {ObjtPai[0] === undefined? 'sem pai': ObjtPai[0].name}
                        </option>
                            {
                                this.props.lista.map((a) => {
                                    
                                        return <option value={a.id}>{a.name}</option>
                                    
                                })
                            }
                    </select>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <p>ícone</p>
                    <input style={{width: '100%'}}/>
                </div>
                <div className={'col-xs-12 col-ms-12 col-md-6'} >
                    <button onClick={() => this.props.edit(this.props.content.id , this.state.name , this.state.selectValue)}>Edit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({contents: state.todo.modal})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ modal, edit }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(editModal)