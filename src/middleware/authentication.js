const jwt = require('jsonwebtoken')
// const User = require('../model/Users')
const {UnAuthenticatedError} = require('../errors')


const auth = async (req, res, next) =>{
   // get token in client 
   try {
      const authHeader = req.headers.authorization
      if(!authHeader || !authHeader.startsWith('Bearer')){
         throw new UnAuthenticatedError('You must login')
      }
      const token = authHeader.split(' ')[1]
      const payload = jwt.verify(token, process.env.JWT_TOKEN)
      const { userID, name } = payload
      req.user = {userID,  name}
      next()
   } catch (error) {
      next(error)
   }
}


module.exports = auth