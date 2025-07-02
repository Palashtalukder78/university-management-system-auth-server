import { z } from 'zod'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'The title is required',
    }),
    year: z.number({
      required_error: 'The year is Required',
    }),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: ' The Start date is required',
      },
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: ' The End date is required',
      },
    ),
  }),
})

export const AcademicValidation = {
  createAcademicSemesterZodSchema,
}
