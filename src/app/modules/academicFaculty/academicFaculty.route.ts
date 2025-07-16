import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

//For Creating
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyControllers.createFaculty,
)

export const AcademicFacultyRoutes = router
