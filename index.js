require('dotenv').config()
const express = require('express');
const app = express();


const port = process.env.PORT ||3000

const notFoundMiddleware = require('./src/middleware/not-found')
const errorHandlerMiddleware = require('./src/middleware/error-handler')
const connect = require('./src/db/connectDB');
const route = require('./src/routes')



app.use(express.json())

//routes
route(app)


// middleware
app.use(notFoundMiddleware)// khi co err thi` middleware bat loi
app.use(errorHandlerMiddleware)

const start = async () => {
   try {
      // connect to db
      await connect(process.env.MONGO_URI)
      // await connect('mongodb+srv://quyen_1102:quyen.11022001@nodeexpressproduct.bn1ka.mongodb.net/Bach-mat-lon?retryWrites=true&w=majority')
      console.log('Connect to db successfully!!!')
      // listen sever
      app.listen(port, ()=>{
         console.log(`listening on ${port}`)
      })
   } catch (error) {
      console.log(error)
   }
}
start()