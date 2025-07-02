import cors from 'cors'
import express, { Application } from 'express'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application router
app.use('/api/v1/users', UserRoutes)

// testing purpose
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

app.use(globalErrorHandler)

export default app
