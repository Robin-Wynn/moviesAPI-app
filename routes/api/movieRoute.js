const express = require('express')
const router = express.Router()
const { movieDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/movie
router.get('/', (req, res)=> {
    // dao.findAll(req, res, dao.table) //req would be needed for pagination
    dao.findAll(req, res, dao.table)
})

// http://localhost:1995/api/movie/get_movies_info
router.get('/get_movies_info', (req, res)=> {
    dao.findMovieInfo(res, dao.table)
})

// http://localhost:1995/api/movie/actor/:actorId
router.get('/actor/:actorId', (req, res)=> {
    dao.findMovieByActorId(res, dao.table, req.params.actorId)
})

// http://localhost:1995/api/movie/sort/:sorter
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/movie/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router