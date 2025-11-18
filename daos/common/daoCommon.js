const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

	// GET: Return all rows
	findAll: (req, res, table)=> {
		
		// .query(sql query, callback func)
		connect.query(
	        `SELECT * FROM ${table};`,
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}
        )
    },

	// GET: Find by ID
	findById: (res, table, id)=> {
	
		connect.query(
			`SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}

		)
	
	},

	// GET: Sort by column
	sort: (res, table, sorter)=> {

		connect.query(
			`SELECT * FROM ${table} ORDER BY ${sorter};`,
		
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}

		)
	},
	
	// create: (req, res, table)=> {

	// 	if (Object.keys(req.body).length === 0) {
	// 		// Object.keys(obj) => array of keys
	// 		res.json({
	// 			"error": true,
	// 			"message": "No fields to create"
	// 		})
	// 	} else {
	// 		const fields = Object.keys(req.body)
	// 		const values = Object.values(req.body)

	// 		connect.execute(
	// 			`INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
	// 			values,
	// 			(error, dbres)=> {
	// 				if (!error){
	// 					console.log(dbres)
	// 					res.render('pages/success', {
	// 						title: 'Success', 
	// 						name: 'Success'
	// 					})
	// 				} else {
	// 					console.log(`${table}Dao error: `, error)
	// 				}
	// 			}
	// 		)

	// 	}
	// },

	// POST: Create new row
	create: (req, res, table) => {
        const data = req.body;

        const sql = `INSERT INTO ${table} SET ?`;

        connect.query(sql, data, (error, result) => {
            queryAction(res, error, result, table)
        })
    },

	// PATCH: Update row by id
    update: (req, res, table) => {
		const id = req.params.id
        const data = req.body

        const sql = `UPDATE ${table} SET ? WHERE ${table}_id = ?`

        connect.query(sql, [data, id], (error, result) => {
            queryAction(res, error, result, table)
        })
    },

	// DELETE: Remove a row
    delete: (req, res, table) => {
        const id = req.params.id;

        const sql = `DELETE FROM ${table} WHERE ${table}_id = ?`

        connect.query(sql, [id], (error, result) => {
            queryAction(res, error, result, table)
        })
    }

}

module.exports = daoCommon
