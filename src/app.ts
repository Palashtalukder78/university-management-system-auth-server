import cors from 'cors'
import express, { Application, Request } from 'express'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//testing purpose
app.get('/', (req: Request, res: any) => {
  res.send('☑ working successfully!')
})

export default app
