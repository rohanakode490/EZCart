const app = require('./app')
const dotenv = require('dotenv')

// config 
dotenv.config({path:"server/config/config.env"})


// Database 
const connectDB = require('./config/database')
// connect to DB 
connectDB()


app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})