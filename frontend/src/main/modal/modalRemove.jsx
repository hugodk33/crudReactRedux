import React, {Component} from 'react'
import {modal, remove} from '../redux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class modalRemove extends Component { 

    render() {
        console.log(this.props.content)
        return(
            <div className={'col-xs-12'} >
                <p>Você realmente deseja deletar esse item?</p>
                <button onClick={() => this.props.remove(this.props.content.id)}>Deletar</button>
                <button onClick={() => this.props.modal('')}>Cancelar</button>        
            </div>
        )
    }
}

const mapStateToProps = state => ({contents: state.todo.modal})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ modal, remove }, dispatch)
    export default connect(mapStateToProps, mapDispatchToProps)(modalRemove)