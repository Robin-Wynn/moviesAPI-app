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
    }

}

module.exports = actorDao