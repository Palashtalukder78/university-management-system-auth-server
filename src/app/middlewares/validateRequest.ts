import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //parse request to zod schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
