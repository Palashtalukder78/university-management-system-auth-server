/* eslint-disable no-undef */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

let server: Server

//Uncaught exception
process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🔋___Database connect successfully!`)

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`⚠___something went wrong!`, error)
  }

  //unhandled rejection
  process.on('unhandledRejection', error => {
    //unhandledRejection is case sensitive
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()

//signal termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM is recieved!')
  if (server) {
    server.close()
  }
})
