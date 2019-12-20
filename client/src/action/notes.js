import axios from '../config/axios'
import Swal from 'sweetalert2'


export const getNotes = (notes)=>{
    return {
        type:"GET_NOTES",
        payload:notes
    }
}
export const startGetNotes = ()=>{
    return (dispatch)=>{
        console.log('inside 2')
        axios.get('/notes', {
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{

            const notes = response.data
            console.log('inside 3', notes)
            dispatch(getNotes(notes))
        })
        .catch((err)=>{
            alert(err)
        })
       
    }
}
export const deleteNotes = (data)=>{
    return {
        type: "DELETE_NOTES",
        payload: data
    }
}
export const startDeleteNotes = (id)=>{
    return (dispatch) =>{
        axios.delete(`/notes/${id}`,{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            dispatch(deleteNotes(response.data._id))
        })
    }
}
export const startAddNotes = (formData,props)=>{
    return (dispatch)=>{
        axios.post('/notes',formData,{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                if(response.data.message.includes('categoryId')){
                    Swal.fire("add category", "","info")
                }else {
                    Swal.fire("form should not be empty","","info")
                }
            }else{
                props.history.push('/notes')
                Swal.fire("added",'',"success")
            }
        })
    }
}
export const startUpdateNotes = (id,formData,props)=>{
    return (dispatch)=>{
        axios.put(`/notes/${id}`, formData,{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            props.history.push('/notes')
        })
    }
}