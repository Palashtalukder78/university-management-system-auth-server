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
router.delete('/:id', AcademicFacultyControllers.deleteFaculty)
router.get('/', AcademicFacultyControllers.getAllFaculties)

//For Creating
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyControllers.createFaculty,
)

export const AcademicFacultyRoutes = router
