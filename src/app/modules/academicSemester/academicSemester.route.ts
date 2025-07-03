import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicValidation } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)

export const AcademicSemesterRoutes = router
