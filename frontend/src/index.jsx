import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/app'
import './style.css'
import reducer from './main/redux/reducer'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const Storess = applyMiddleware(thunk, multi, promise)(createStore)(reducer, devTools)

ReactDOM.render(<Provider store={Storess}><App /></Provider>, document.getElementById('root'))