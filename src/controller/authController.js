const {StatusCodes} = require('http-status-codes')
const User = require('../model/Users')

const { BadRequestError, UnAuthenticatedError } = require('../errors')


// method [POST] /api/v1/auth/register
const register = async (req, res, next) => {
   // console.log(req.body);
   User.create({...req.body})
      .then((user) => {
         const token = user.createJWT()
         res.status(StatusCodes.CREATED).json({user: {name: user.getName()}, token})
      })
      .catch(next)
}

// method [POST] /api/v1/auth/login

const login = async (req, res, next) => {
   try {
      const {email, password} = req.body // lay data nguoi dung nhap vao
      const user = await User.findOne({email})// tim kiem email nguoi dung nhap vao trong database
      // kiem tra phai nhap email va password
      if(!email || !password) {
         throw new BadRequestError('Must provide an email or password')// email k ton tai thi throw err
      }
      // kiem tra xem co tim thay email trong data base khong
      if(!user){
         throw new UnAuthenticatedError('Invalid email')
      }
      //compare password
      const inPasswordCorrect = await user.comparePassword(password)
      if(!inPasswordCorrect){
         throw new UnAuthenticatedError('Invalid password')
      }
      // create token for login
      const token = user.createJWT()
      res.status(StatusCodes.OK).json({user: {name: user.getName()}, token})

   } catch (error) {
      next(error)
   }
}

module.exports = {
   register,
   login,
}