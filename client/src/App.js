import React from 'react'
import Home from './component/common/Home'
import Login from './component/users/Login'
import Register from './component/users/Register'

import axios from './config/axios'

import NotesList from './component/notes/NotesList'
import AddForm from './component/notes/addForm'
import EditForm from './component/notes/editForm'

import CategoryList from './component/category/categoryList'

import {BrowserRouter , Route,Link} from 'react-router-dom'
import PrivateRoute from './privateRoute/privateRoute'
import Swal from 'sweetalert2'

function handleClick(){
  Swal.fire({
      title: "Logout?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText: "OK",
      closeOnConfirm: true,
  }).then((result)=>{
    if(result.value){
      axios.delete('/users/logout',{
        headers:{
          'x-auth':localStorage.getItem('authToken')
        }
      })
      .then(response=>{
       
        localStorage.removeItem('authToken')
        Swal.fire({
          title:"Successfully loggedout",
          type:"success"
        }).then((result)=>{
          window.location.reload()
        })
       
      })
    }
  })
  
}
function App() {
  return (
    <BrowserRouter>
    <div>
      <h2>Notes App</h2>
      <ul>
      <Link to='/'>Home</Link>|
      {
        localStorage.getItem('authToken')?(
          <div>
            <li><Link to='/notes'>Notes</Link></li>
            <li><Link to='/categories'>Category</Link></li>
            <li><Link to='#' onClick={handleClick}>logout</Link></li>
          </div>):(<div>
            <li><Link to='/users/register'>register</Link></li>
            <li><Link to='/users/login'>login</Link></li>
          </div>
        )
      }
      

      <Route path='/' component={Home} exact={true}/>
      <Route path='/users/register' component={Register}/>
      <Route path='/users/login' component={Login}/>

      <PrivateRoute path='/categories' component={CategoryList}/>

      
      <PrivateRoute path='/notes' component={NotesList} exact={true}/>
      <PrivateRoute path='/notes/add' component={AddForm}/>
      <PrivateRoute path='/notes/edit/:id' component={EditForm}/>



      </ul>

    </div>
    </BrowserRouter>
  )
}

export default App;
