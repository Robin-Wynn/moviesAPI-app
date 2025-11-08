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

const mtaDao = {
    ...daoCommon,
    ...require('./api/movie_to_actorDao')
}

const mtdDao = {
    ...daoCommon,
    ...require('./api/movie_to_directorDao')
}

const mtgDao = {
    ...daoCommon,
    ...require('./api/movie_to_genreDao')
}

const mtsDao = {
    ...daoCommon,
    ...require('./api/movie_to_streamingDao')
}

const productionDao = {
    ...daoCommon,
    ...require('./api/productionDao')
}

const streaming_platformDao = {
    ...daoCommon,
    ...require('./api/streaming_platformDao')
}

module.exports = {
    movieDao,
    actorDao,
    genreDao,
    directorDao,
    mtaDao,
    mtdDao,
    mtgDao,
    mtsDao,
    productionDao,
    streaming_platformDao
}