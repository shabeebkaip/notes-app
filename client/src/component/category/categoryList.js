import React from 'react'

import {connect} from 'react-redux'
import { startGetCategories, startDeletCategory, startAddCategory, startEditCategory } from '../../action/category'
import Swal from 'sweetalert2'


 class CategoryList extends React.Component{
    constructor(){
        super()
        this.state={
            categories:[],
            text:"",
            isEdit:true,
            id:''
        }
    }

    componentDidMount=()=>{
        // axios.get('/categories',{
        //     headers:{
        //     'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     const categories=response.data
        //     this.setState({categories})
        // })
        this.props.dispatch(startGetCategories())
    }

    handleRemove=(e)=>{
        const id=e.target.value

        Swal.fire({
            title:"Are you sure?",
            text:"you would not be able to revert this",
            icon: "warning",
            showCancelButton:true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor:"#d33",
            confirmButtonText:"yes delete it!"
        }).then((result)=>{
            if(result.value) {
                this.props.dispatch(startDeletCategory(id))
                Swal.fire(
                    "Deleted",
                    "Your file has been deleted",
                    "success"
                )

            }
        })
         // axios.delete(`/categories/${id}`,{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        // // console.log(response.data)
        //     window.location.reload()
        // })
    
    }

    handleAdd=()=>{
        const data = {"name":this.state.text}
        this.props.dispatch(startAddCategory(data))
        
        // axios.post('/categories',{"name":this.state.text},{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     window.location.reload()
        // })
    }

    handleChange=(e)=>{
        const text=e.target.value
        this.setState({text})
    }

    editHandle=(id,name)=>{
        // console.log(id,name)
        this.setState({text:name,id, isEdit:false})
    }

    saveHandle=()=>{
        const id=this.state.id
        const data = {"name": this.state.text}
        this.props.dispatch(startEditCategory(id,data))
        // axios.put(`/categories/${id}`,{"name":this.state.text},{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        // console.log(response.data)
        // window.location.reload()        
        // })
    }

    render(){
        return (
            <div>
                <h2>Category List -{this.props.categories.length}</h2>
                <ul>
                {   
                    this.props.categories.map(category=>{
                       return <li key={category._id}>{category.name}<button value={category._id}onClick={this.handleRemove}>remove</button><button onClick={()=>this.editHandle(category._id,category.name)}>Edit</button></li>
                    })                    
                }
                </ul>
                <br/>
                
                <input type='text' value={this.state.text} onChange={this.handleChange}/>
                {this.state.isEdit ?
                (<button onClick={this.handleAdd}>Add</button>):(<button onClick={this.saveHandle}>save</button>)
                }
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps) (CategoryList)