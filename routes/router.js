const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995

// Home Page => http://localhost:1995
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Movie App Home',
        name: 'Robin\'s Movie App🎬'
    })
})

// Actor-Form => http://localhost:1995/actor-form
router.get('/actor-form', (req, res)=> {
    res.render('pages/actor-form', {
        title: 'actor-form',
        name: 'actor-form'
    })
})

// root route 
router.get('/api', (req, res)=> {
    // res.send('movie api')
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`,
        "All Actors": `http://localhost:${PORT}/api/actor`,
        "All Genres": `http://localhost:${PORT}/api/genre`,
        "All Directors": `http://localhost:${PORT}/api/director`,
        "Production": `http://localhost:${PORT}/api/production`
    })
})

// endpoints
const endpoints = [
    'movie',
    'actor',
    'genre',
    'director',
    'production'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Route`))
})

// Error handling
router.use((req, res, next)=> {
	res.status(404)
	.send('<h1>404 Error this page does not exit</h1>')
})


module.exports = router