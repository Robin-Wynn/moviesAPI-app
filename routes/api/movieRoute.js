const express = require('express')
const router = express.Router()
const { movieDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/movie
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table) //req would be needed for pagination
    dao.findMovieInfo(res, dao.table)
})

// http://localhost:1995/api/movie/get_movies/3
router.get('/get_movies/:id', (req, res)=> {
    dao.findMovieByActorId(res, dao.table, req.params.id)
})

router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/movie/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router