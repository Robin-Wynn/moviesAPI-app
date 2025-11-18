const router = require('express').Router()
const { genreDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/genre
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //req would be needed for pagination
})

// http://localhost:1995/api/genre/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:1995/api/genre/1
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// POST 
// http://localhost:1995/api/genre/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
// http://localhost:1995/api/genre/update/1
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

// DANGER ZONE !!DELETE!!
// http://localhost:1995/api/genre/delete/1
router.delete('/delete/:id', (req, res)=> {
    dao.delete(req, res, dao.table)
})
module.exports = router