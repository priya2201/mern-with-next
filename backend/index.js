const express = require('express')
const app = express()
const cors=require('cors')
const mongoose = require('mongoose')
let port = 9090
const ProductRoute = require('./Router')
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/',ProductRoute)
async function start() {
    
    mongoose.connect('mongodb://localhost:27017/materialUiNextExpressMongodb')
    console.log('mongodb connected')

    await app.listen(port, () => {
        console.log('server listening')
    })
}
start()
