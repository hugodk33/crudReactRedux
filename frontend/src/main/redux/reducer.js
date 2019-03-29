import { combineReducers } from 'redux'

const INITIAL_STATE = { name: '', list: [], isEdit: true, modal: {isOpen: false , content: null, template: null}, isSearch: false }

const rootReducer = combineReducers({
    todo: (state = INITIAL_STATE, action) => {
            switch(action.type) {
                case 'TODO_SEARCHED':
                    return { ...state, list: action.payload, isSearch: action.isSearch}
                case 'DESCRIPTION_CHANGED':
                    return { ...state, name: action.payload , isSearch: action.isSearch}
                case 'TODO_CLEAR':
                    return { ...state, name: '' }
                case 'MODAL':
                    return { ...state, modal: {isOpen: !state.modal.isOpen , content: action.payload, template: action.template} }
                default:
                    return state
            }
        } 
    }        
)   

export default rootReducer