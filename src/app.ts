import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application router
app.use('/api/v1/users', usersRouter)

//testing purpose
app.get('/', async (req: Request, res: Response) => {
  res.send('☑ working successfully!')
})

export default app
