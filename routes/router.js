const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 1995

// root route 
router.get('/api', (req, res)=> {
    // res.send('movie api')
    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`
    })
})

router.use('/api/movie', require('./api/movieRoute'))

// Error handling
router.use((req, res, next)=> {
	res.status(404)
	.send('<h1>404 Error this page does not exit</h1>')
})


module.exports = router