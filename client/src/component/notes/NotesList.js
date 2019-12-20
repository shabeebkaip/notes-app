import React from 'react'
//import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startDeleteNotes } from '../../action/notes'
import Swal from 'sweetalert2'

 class NotesList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            notes:[],
            categories:[],
            isNote:true
        }
    }

    componentDidMount=()=>{
        // axios.get('/notes',{
        //     headers:{
        //         'x-auth':localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     const notes=response.data
        //     this.setState({notes})
        // })
        // .catch(err=>{
        //     alert(err)
        // })
        // this.props.dispatch(startGetNotes())
        
    }

    handleRemove=(e)=>{
        const id = e.target.value
        Swal.fire({
            title:'are you sure?',
            text:"you would not be able to revert this!",
            icon: "warning",
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, delete it'
        }).then((result)=>{
            if(result.value){
                this.props.dispatch(startDeleteNotes(id, this.props))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                      'success'
                ).then(()=>{
                    window.location.reload()
                })
                
                
               
            }
        })
      //  const remove=window.confirm('are you sure?')
    //     if(remove){
    //     axios.delete(`/notes/${e.target.value}`,{
    //         headers:{
    //             'x-auth':localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response=>{
    //         // alert(response.data)
    //         window.location.reload()

    //     })
    // }
    }

    render(){
        console.log('notes', this.props.notes)
        return (
            <div>
                <h2>Notes List -{this.props.notes.length}</h2>
                <button><Link to='/notes/add'>Add</Link></button>
                        {this.props.notes.map(note=>{
                           return ( <div key={note._id}>
                                <h2>{note.title}</h2>
                                <h4>{note.categoryId.name}</h4>
                                <p>{note.description}</p>
                                <button><Link to={`/notes/edit/${note._id}`}>Edit</Link></button><button value={note._id} onClick={this.handleRemove}>Remove</button>
                                <hr/>
                            </div>)
                        })}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        notes:state.notes
    }
}
export default connect(mapStateToProps)(NotesList)