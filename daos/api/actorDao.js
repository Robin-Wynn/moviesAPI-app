const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const actorDao = {
	table: 'actor',
	
	

    // Find all actors for a given movie (by ID or title)
	findActorsByMovie: (res, table,	movieKey) => {

	  	const isId = !isNaN(movieKey)
	  	let sql = ''
	  	let params = []	

	  	if (isId) {
			sql = `
	  	    SELECT 
	  	     	m.movie_id,
	  	      	m.title,
	  	      	GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR 	', ')	AS actors
	  	    FROM movies m
	  	    JOIN movie_to_actor mta ON m.movie_id = mta.movie_id
	  	    JOIN actor a ON mta.actor_id = a.actor_id
	  	    WHERE m.movie_id = ?
	  	    GROUP BY m.movie_id
			;`
	  		params = [movieKey]
	  	} else {
	  		sql = `
	  	    SELECT 
				m.movie_id,
				m.title,
				GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR 	', ')	AS actors
	  	    FROM movie m
	  	    JOIN movie_to_actor mta ON 	m.movie_id = mta.movie_id
	  	    JOIN actor a ON mta.actor_id =	a.actor_id
	  	    WHERE LOWER(m.title) LIKE LOWER(?)
	  	    GROUP BY m.movie_id
			;`
	  		params = [`%${movieKey}%`]
	  	}	

	  	con.execute(sql, params, (error, rows) => {
	  		queryAction(res, error, rows, table)
	  	})
	}

}

module.exports = actorDao