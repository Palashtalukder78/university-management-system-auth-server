/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { handleValidationError } from '../../errors/handleValidationError'
import handleZodError from '../../errors/handleZodError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorLogger } from '../../shared/logger'

//Global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //manage logger base on env
  config.isenv === 'development'
    ? console.log('🚀 From GlovalErrorHandler ~~~', error)
    : errorLogger.error('🚀 From GlovalErrorHandler ~~~', error)

  let statusCode: number = 500
  let message: string = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessage = [
      {
        path: '',
        message: error.message,
      },
    ]
  }
  //Common error pattern
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.isenv !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
