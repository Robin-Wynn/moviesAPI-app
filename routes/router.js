const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995

// root route 
router.get('/api', (req, res)=> {
    // res.send('movie api')
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`,
        "All Actors": `http://localhost:${PORT}/api/actor`,
        "All Genres": `http://localhost:${PORT}/api/genre`,
        "All Directors": `http://localhost:1995/api/director`

    })
})

// endpoints
const endpoints = [
    'movie',
    'actor',
    'genre',
    'director'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Route`))
})

// //add movie endpoint
// router.use('/api/movie', require('./api/movieRoute'))
// //Add actor endpoint
// router.use('/api/actor', require('./api/actorRoute'))

// Error handling
router.use((req, res, next)=> {
	res.status(404)
	.send('<h1>404 Error this page does not exit</h1>')
})


module.exports = router