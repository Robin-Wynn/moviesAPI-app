// Build server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 1995

// handle security
const helmet = require('helmet')
const cors = require('cors')

// configuring helmet
// server.use(helmet())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directive: {
        "img-src": [" ' self ' ", "https: data"],
        "scriptSrc": [" ' self ' ", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Hey, I'm setting my engine up to ejs!
server.set('view engine', 'ejs')

// localhost:1995
server.use('/', router)

server.listen(PORT, ()=> console.log(`PORTY over here (￣y▽￣)╭ Ohohoho.....`))