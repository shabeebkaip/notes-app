const express = require('express')
const connectDB = require('./config/database')
const cors=require('cors')
const router = require('./config/routes')
const app = express()
const port = 3015
connectDB() 
app.use(cors())

app.use(express.json())
app.use('/', router)
app.listen(port, () => {
    console.log('listening on port', port)
})