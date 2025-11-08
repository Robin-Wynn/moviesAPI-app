const router = require('express').Router()
const { streaming_platformDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/streaming_platform
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //req would be needed for pagination
})

// http://localhost:1995/api/streaming_platform/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/streaming_platform/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router