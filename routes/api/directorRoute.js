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

// POST 
// http://localhost:1995/api/director/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
// http://localhost:1995/api/director/update/1
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

// DANGER ZONE !!DELETE!!
// http://localhost:1995/api/director/delete/1
router.delete('/delete/:id', (req, res)=> {
    dao.delete(req, res, dao.table)
})
module.exports = router