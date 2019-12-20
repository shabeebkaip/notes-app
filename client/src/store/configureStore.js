import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import notesReducer from '../reducer/notes'
import userReducer from '../reducer/user'
import categoriesReducer from '../reducer/category'
import noteReducer from '../reducer/note'
const configureStore = ()=>{
    const store = createStore(combineReducers({
        notes:notesReducer,
        note: noteReducer,
        user: userReducer,
        categories: categoriesReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore