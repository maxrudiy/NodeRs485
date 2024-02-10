'use strict'
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const route485 = require(`${__dirname}/routes/route485`)

const PORT_API = process.env.PORT_API || 3000
const MONGO_URL = process.env.MONGO_URL

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use('/api/485/', route485)

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('This blog')
})

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT_API, () => {
            console.log(`Node API app is running on port ${PORT_API}`)
        })
        console.log('connected  to MongoDB')
    }).catch((error) => {
        console.log(error)
    })