import axios from '../config/axios'
import Swal from 'sweetalert2'

//Registration
export const startUserRegister = (formData, props) =>{
    return (dispatch)=>{
        axios.post('/users/register',formData)
            .then((response)=>{
                if(!response.data._id){
                    Swal.fire({
                        icon:'error',
                        title:'Oops',
                        text:'User already exists'
                    })
                }else{
                    props.history.push('/users/login')
                }
            })
            .catch((err)=>{
                Swal.fire(err)
            })
    }
}
export const startUserLogin = (formData,props)=>{
    return (dispatch)=>{
        axios.post('/users/login',formData)
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                Swal.fire(response.data.error)
            }else {
                const token = response.data.token
                localStorage.setItem('authToken', token)
                props.history.push('/notes')
                window.location.reload()

            }
        })
        .catch((err)=>{
            Swal.fire(err)
        })
    }
}