const router = require('express').Router()
const { mtaDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/movie_to_actor
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //req would be needed for pagination
})

// http://localhost:1995/api/movie_to_actor/find/20
router.get('/find/:movieKey', (req, res)=> {
    dao.findActorsByMovie(res, dao.table, req.params.movieKey)
})

// http://localhost:1995/api/movie_to_actor/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/movie_to_actor/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router