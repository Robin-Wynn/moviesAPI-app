const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const movieDao = {

    table: 'movie',

    // findMovieByActorId: (res, table, actorId)=> {
        
    //     let params = []

    //     const sql = `
    //         SELECT 
    //             m.movie_id, 
    //             m.title, 
    //             m.yr_released,
    //             a.actor_id,
    //             CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
    //             GROUP_CONCAT(DISTINCT m.title SEPARATOR ', ') AS movies
	// 	    FROM movie m  
	// 	    JOIN movie_to_actor mta ON m.movie_id = mta.movie_id
	// 	    JOIN actor a ON mta.actor_id = a.actor_id
	// 	    WHERE a.actor_id = ?
    //         GROUP BY a.actor_id;`

    //     con.query(sql, [actorId], (error, rows) => {
    //         queryAction(res, error, rows, table)
    //     })
		
		// con.execute(
		// 	sql,
		// 	(error, rows)=> {
				
		// 		if (!error) {
		// 			// Take our object and add it to the array if no error
		// 			Object.values(rows).forEach(obj => {
		// 				movies.push(obj)
		// 			})
		// 			con.execute(
		// 				`SELECT * FROM ${table};`,
		// 				(error, rows)=> {
		// 					rows.forEach(row => {
		// 						row.movies = movies
		// 					})
		// 					if (!error) {
		// 						res.json(...rows)
		// 					} else {
		// 						console.log('Dao Error', error)
		// 					}
		// 				}
		// 			)
		// 		} else {
		// 			res.send('error')
		// 		}
		// 	}
		// )
       
    // },

    findMovieInfo: (res, table)=> {

        let sql = `
        SELECT 
            m.movie_id, 
            m.title, 
            m.rating, 
            m.runtime, 
            m.nationality, 
            m.yr_released, 
            m.budget,
            m.gross,
            m.showing,
            p.production AS production_company,
            GROUP_CONCAT(DISTINCT g.genre SEPARATOR ', ') AS genres 
        FROM movie m
        JOIN production p ON m.production_id = p.production_id
        JOIN movie_to_genre mtg ON m.movie_id = mtg.movie_id
        JOIN genre g ON mtg.genre_id = g.genre_id
        GROUP BY m.movie_id
        ;`

        con.query(sql, (error, rows) => {
            queryAction(res, error, rows, table)
        })
    }

}

module.exports = movieDao