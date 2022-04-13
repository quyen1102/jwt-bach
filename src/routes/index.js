const routerAuthorization = require('./auth')
const routerSite = require('./site')

//middleware
const authenticationMiddleware = require('../middleware/authentication')

function route(app){
   app.use('/api/v1/auth', routerAuthorization)
   app.use('/api/v1',authenticationMiddleware, routerSite )
}

module.exports = route