import React from 'react'

import {connect} from 'react-redux'
import { startGetCategories } from '../../action/category'

 class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:props.note ? props.note.title:'',
            description:props.note ? props.note.description:'',
            categoryId:props.note ? props.note.categoryId:'',
            categories:[]
        }
    }

    componentDidMount(){
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

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandle=(e)=>{
        e.preventDefault()
        const formData={
            title:this.state.title,
            description:this.state.description,
            categoryId:this.state.categoryId
        }
        // console.log(formData)
        this.props.submitHandle(formData)
    }
    render(){
        return (
            <div>
                <form onSubmit={this.submitHandle}>
                <label>title:
                    <input type='text' value={this.state.title} onChange={this.handleChange} name='title'/>
                </label><br/>
                <label>description:
                    <textarea type='text' value={this.state.description} onChange={this.handleChange} name='description'></textarea>
                </label><br/>
                <label>category:
                <select value={this.state.categoryId} onChange={this.handleChange} name='categoryId'>
                    <option>---select category---</option>
                        {this.props.categories.map(category=>{
                            return <option key={category._id} value={category._id}>{category.name}</option>
                        })}
                    </select>
                </label><br/>
                <input type='submit'/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        categories: state.categories
    }
}
 export default connect(mapStateToProps)(Form)