import React from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import Form from './Form'
import { startUpdateNotes} from '../../action/notes'


 class EditForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}
        }
    }

    componentDidMount(){
        axios.get(`/notes/${this.props.match.params.id}`,{
            headers:{
            'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const note=response.data
            this.setState({note})
            // console.log(response.data)
        })
        //this.props.dispatch(startGetNotes())
    }
    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        this.props.dispatch(startUpdateNotes(id,formData, this.props))
        // axios.put(`/notes/${this.props.match.params.id}`,formData,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     // window.location.reload()
        //     this.props.history.push('/notes')
        // })
    }
    render(){
        console.log(this.props.notes)
        return (
            <div>
                <h2>Edit Form</h2>
                {Object.keys(this.state.note).length!==0 && <Form note={this.state.note} submitHandle={this.submitHandle}/>}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        notes:state.notes
    }
}
export default connect(mapStateToProps) (EditForm)