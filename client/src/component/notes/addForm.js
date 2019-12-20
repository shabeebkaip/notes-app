import React from 'react'
//import axios from '../../config/axios'
import {connect} from "react-redux"
import Form from './Form'
import { startAddNotes } from '../../action/notes'

 class AddForm extends React.Component{
    submitHandle=(formData)=>{
        // axios.post('/notes',formData,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     //window.location.reload()
        //     this.props.history.push('/notes')
        // })
        this.props.dispatch(startAddNotes(formData, this.props))
    }
    render(){
        return (
            <div>
                <h2>Add Form</h2>
                <Form submitHandle={this.submitHandle}/>
            </div>
        )
    }
}
export default connect() (AddForm)