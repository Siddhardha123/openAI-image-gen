import express from 'express'
import router from './routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()



app.use(cors())
app.use(express.json())
app.use('/openai',router)


app.listen(3000,()=>{
    console.log("server started")
})