const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const actorDao = {
	table: 'actor',
	
	// Find movies by actor name or ID 
    findMoviesByActor: (res, table, nameOrId) => {
        // We'll detect whether user passed a number (id) or string (name) 💡
        const isId = !isNaN(nameOrId)
        let sql = ''
        let params = []   

        if (isId) {
            // Search by actor_id
            sql = `
                SELECT 
                    a.actor_id,
                    CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
                    GROUP_CONCAT(DISTINCT m.title SEPARATOR ', ') AS movies
                FROM actor a
                JOIN movie_to_actor mta ON a.actor_id = mta.actor_id
                JOIN movie m ON mta.movie_id = m.movie_id
                WHERE a.actor_id = ?
                GROUP BY a.actor_id;
            `
            params = [nameOrId]

        } else {
            // Search by full name (case-insensitive)
            sql = `
                SELECT 
                    a.actor_id,
                    CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
                    GROUP_CONCAT(DISTINCT m.title SEPARATOR ', ') AS movies
                FROM actor a
                JOIN movie_to_actor mta ON a.actor_id = mta.actor_id
                JOIN movie m ON mta.movie_id = m.movie_id
                WHERE REPLACE(LOWER(CONCAT(a.first_name, a.last_name)), ' ', '') LIKE LOWER(?)
                GROUP BY a.actor_id;
            `
            params = [`%${nameOrId}%`]  //will allow partial matches like reesewitherspoon or reese ❤️
        } 
        con.execute(sql, params, (error, rows) => {
            queryAction(res, error, rows, table)
        })
    },

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