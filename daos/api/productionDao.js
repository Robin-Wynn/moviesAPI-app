const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const productionDao = {
    table: 'production',

    findProductionInfo: (res, table, id)=> {

        let sql = `
        SELECT 
            p.production,
            p.production_id,
            m.movie_id,
            m.title AS movie_title
        FROM 
            production p
        INNER JOIN 
            movie m ON p.production_id = m.production_id
        ;`

        con.execute(sql, id, (error, rows) => {
            queryAction(res, error, rows, table)
        })

    }
}

module.exports = productionDao