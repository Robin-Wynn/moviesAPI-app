const router = require('express').Router()
const { directorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/director
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //req would be needed for pagination
})

// http://localhost:1995/api/director/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/director/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router