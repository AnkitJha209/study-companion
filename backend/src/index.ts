import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(urlencoded())
app.use(cors())
app.use(cookieParser())

app.get('/health-check', (req: Request, res: Response)=> {
    res.status(200).json({
        success:true,
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})