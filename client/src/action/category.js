import axios from '../config/axios'


export const getCategories = (category)=>{
    return {
        type:"GET_CATEGORIES",
        payload:category
    }
}
export const startGetCategories = ()=>{
    return (dispatch)=>{
        axios.get('/categories',{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const categories = response.data
            dispatch(getCategories(categories))
        })
    }
}
export const deleteCategory = (category)=>{
    return {
        type: "DELETE_CATEGORY",
        payload: category
    }
}
export const startDeletCategory = (id)=>{
    return(dispatch)=>{
        axios.delete(`/categories/${id}`, {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(deleteCategory(response.data._id))
            window.location.reload()
        })
    }
}
export const addCategory = (data)=>{
    return {
        type: "ADD_CATEGORY",
        payload:data
    }
}
export const startAddCategory = (data)=>{
    return (dispatch)=>{
        axios.post('/categories', data,{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(addCategory(response.data))
            // window.location.reload()
        })
    }
}
export const startEditCategory = (id,data)=>{
    return (dispatch)=>{
        axios.put(`/categories/${id}`, data,{
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            window.location.reload()
        })
    } 
}