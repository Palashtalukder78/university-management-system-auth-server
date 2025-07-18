//Zod validation start
//req---->validation
//body--->object
//data--->object
import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
//Zod validation end
