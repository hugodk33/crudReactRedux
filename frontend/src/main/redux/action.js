import axios from 'axios'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const add = (name , parentId) => {
    return dispatch => {
        axios.post('http://localhost:3000/categories', {name , parentId} )
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search("")))
    }
}

export const edit = (id, name , parentId) => {
    console.log(id , name , parentId)
    return dispatch => {
        axios.put(`http://localhost:3000/categories/` + id , {name , parentId})
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search("")))
            .then(resp => dispatch(modal("")))
    }
}

export const remove = (id) => {
    console.log(id)
    return dispatch => {
        axios.delete('http://localhost:3000/categories/' + id)
            .then(resp => dispatch(search("")))
            .then(resp => dispatch(modal("")))
    }
}

export const search = (value) => {
    return dispatch => {
        if(value === "") {
            axios.get('http://localhost:3000/categories')
                .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data , isSearch: false}))
        } else {
            axios.get('http://localhost:3000/categories?name=' + value)
                .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data, isSearch: true}))
        }
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search("")]
}

export const modal = (item, template) => {
    return  dispatch => dispatch({
        type: 'MODAL',
        payload: item,
        template: template
    })
}