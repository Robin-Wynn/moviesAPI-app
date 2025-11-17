const express = require('express')
const router = express.Router()
const con = require('../config/dbconfig')
const PORT = process.env.PORT || 1995

// Home Page => http://localhost:1995
router.get('/', async (req, res) => {

    res.render('pages/home', {
        title: 'Movie App Home',
        name: 'Robin\'s Movie App🎬',
    })

})

// Actor-Form => http://localhost:1995/actor-form
router.get('/actor-form', (req, res)=> {
    res.render('pages/actor-form', {
        title: 'actor-form',
        name: 'actor-form'
    })
})
// movies-form => http://localhost:1995/movies-form
router.get('/movies-form', (req, res)=> {
    res.render('pages/movies-form', {
        title: 'movies-form',
        name: 'movies-form'
    })
})
// genre-form => http://localhost:1995/genre-form
router.get('/genre-form', (req, res)=> {
    res.render('pages/genre-form', {
        title: 'genre-form',
        name: 'genre-form'
    })
})
// movies-form => http://localhost:1995/movies-form
router.get('/movies-form', (req, res)=> {
    res.render('pages/movies-form', {
        title: 'movies-form',
        name: 'movies-form'
    })
})

// // Forms 
// router.get('/pages', (req, res)=> {
//     res.json({
//         'Movies Form': `http://localhost:${PORT}/pages/movies-form`,
//         'Actor Form': `http://localhost:${PORT}/pages/actor-form`,
//         'Director Form': `http://localhost:${PORT}/pages/director-form`,
//         'Production Company Form': `http://localhost:${PORT}/productionCompany-form`,
//         'Genre Form': `http://localhost:${PORT}/genre-form`
//     })
// })

// const formEndpoints = [
//     'actor-form',
//     'director-form',
//     'genre-form',
//     'movies-form',
//     'productionCompany-form'
// ]

// formEndpoints.forEach(formEndpoint => {
//     router.use(`/pages/${formEndpoint}`, require(`../views/pages/${formEndpoint}`))
// })

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