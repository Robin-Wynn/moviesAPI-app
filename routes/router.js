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
        "All Directors": `http://localhost:${PORT}/api/director`,
        "Movie to Actors": `http://localhost:${PORT}/api/movie_to_actor`,
        "Movie to Directors": `http://localhost:${PORT}/api/movie_to_director`,
        "Movie to Genres": `http://localhost:${PORT}/api/movie_to_genre`,
        "Movie to Streaming": `http://localhost:${PORT}/api/movie_to_streaming`,
        "Production": `http://localhost:${PORT}/api/production`,
        "Streaming Platform": `http://localhost:${PORT}/api/streaming_platform`

    })
})

// endpoints
const endpoints = [
    'movie',
    'actor',
    'genre',
    'director',
    'movie_to_actor',
    'movie_to_director',
    'movie_to_genre',
    'movie_to_streaming',
    'production',
    'streaming_platform'
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