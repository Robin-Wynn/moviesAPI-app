const daoCommon = require('./common/daoCommon')

const movieDao = {
    ...daoCommon,
    ...require('./api/movieDao')
}

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const genreDao = {
    ...daoCommon,
    ...require('./api/genreDao')
}

const directorDao = {
    ...daoCommon,
    ...require('./api/directorDao')
}

module.exports = {
    movieDao,
    actorDao,
    genreDao,
    directorDao
}