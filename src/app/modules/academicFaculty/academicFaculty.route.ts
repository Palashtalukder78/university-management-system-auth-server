import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router.get('/:id', AcademicFacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyControllers.updateFaculty,
)

//For Creating
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyControllers.createFaculty,
)

router.get('/', AcademicFacultyControllers.getAllFaculties)

export const AcademicFacultyRoutes = router
