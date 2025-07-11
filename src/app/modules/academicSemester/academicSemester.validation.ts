import { z } from 'zod'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'The title is required',
    }),
    year: z.string({
      required_error: 'The year is Required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: ' The Start date is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: ' The End date is required',
    }),
  }),
})

// 1) Ensure 1: in route level -> Update: give me both/neither title and code
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'The title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'The year is Required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: ' The Start date is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: ' The End date is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or nither !',
    },
  )

export const AcademicValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
