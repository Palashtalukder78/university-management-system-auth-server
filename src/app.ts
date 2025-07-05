import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import status from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application router
app.use('/api/v1', routes)

// testing purpose
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

app.use(globalErrorHandler)

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Not found!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found!',
      },
    ],
  })
  next()
})

export default app
