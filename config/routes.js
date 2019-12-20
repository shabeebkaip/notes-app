const express=require('express')
const router=express.Router()
const notesController=require('../app/controller/notesController')
const categoriesController=require('../app/controller/categoriesController')
const usersController=require('../app/controller/usersController')
const authenticateUser=require('../app/middlewares/authentication')


router.get('/notes',authenticateUser,notesController.list)
router.post('/notes',authenticateUser,notesController.create)
router.get('/notes/:id',authenticateUser,notesController.show)
router.delete('/notes/:id',authenticateUser,notesController.destroy)
router.put('/notes/:id',authenticateUser,notesController.update)

//category
router.get('/categories',authenticateUser,categoriesController.list)
router.post('/categories',authenticateUser,categoriesController.create)
router.get('/categories/:id',authenticateUser,categoriesController.show)
router.put('/categories/:id',authenticateUser,categoriesController.update)
router.delete('/categories/:id',authenticateUser,categoriesController.destroy)

//user-authentication
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout',authenticateUser, usersController.logout)







module.exports=router