const router = require('express').Router()
const { actorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/actor
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //req would be needed for pagination
})

// http://localhost:1995/api/actor/actorMovie/:nameOrId
router.get('/actorMovie/:nameOrId', (req, res)=> {
    dao.findMoviesByActor(res, dao.table, req.params.nameOrId)
})

// http://localhost:1995/api/actor/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/actor/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router