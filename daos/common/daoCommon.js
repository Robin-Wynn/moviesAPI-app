const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

	//create methods that will query the database
	findAll: (req, res, table)=> {
		
		// .query(sql query, callback func)
		connect.query(
	        `SELECT * FROM ${table};`,
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}
        )
    },

	findById: (res, table, id)=> {
	
		connect.query(
			`SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}

		)
	
	},

	sort: (res, table, sorter)=> {

		connect.query(
			`SELECT * FROM ${table} ORDER BY ${sorter};`,
		
			(error, rows)=> {
				queryAction(res, error, rows, table)
			}

		)
	} 

}

module.exports = daoCommon
