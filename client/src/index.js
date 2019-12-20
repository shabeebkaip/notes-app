import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import configureStore from './store/configureStore'
import { startGetNotes } from './action/notes';
import { startGetCategories } from './action/category';



const store = configureStore()

store.subscribe = ()=>{
    console.log(store.getState())
}
// store.dispatch(startGetNotes())

if(localStorage.getItem('authToken')){
    console.log('inside')
    store.dispatch(startGetNotes())
    store.dispatch(startGetCategories())
}


const ele = (
    <Provider store = {store}>
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));

