import React, { Component } from  'react'
import List from './template/List'
import Form from './template/Form'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { search , changeDescription, edit } from './redux/action'

class App extends Component {

    componentDidMount() {
        this.props.search("")
    }

    render(){
    
        if(this.props.lista) {

            this.props.lista.forEach((a,b,c) => {
                a.childNodes = []
                c.forEach((ab) => {
                    if(a.id === ab.parentId) {
                        if(ab !== undefined) {
                            return a.childNodes.push(ab)
                        }
                    }
                })
            })
        }

        const lista = this.props.lista
        
        return (
            <div>
                <Form />
                <List lista={lista} />
            </div>
        )
    }        
}

const mapStateToProps = state => ({lista: state.todo.list , edit: state.todo.isEdit})
const mapDispatchToProps = dispatch => 
    bindActionCreators({changeDescription, search, edit }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)