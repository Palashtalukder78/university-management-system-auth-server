import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicValidation } from './academicSemester.validation'

const router = express.Router()

//For Creating
router.post(
  '/create-semester',
  validateRequest(AcademicValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)
// for get single item
router.get('/:id', AcademicSemesterController.getSingleSemester)

// For Update
// 1) Ensure 1: in route level -> Update: give me both/neither title and code
// 2) Ensure 2: in service level -> update: mapping title and code
router.patch(
  '/:id',
  validateRequest(AcademicValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
)
//For delete
router.delete('/:id', AcademicSemesterController.deleteSemester)

//for get all with paginations, sorting and filtering
router.get('/', AcademicSemesterController.getAllSemester)

export const AcademicSemesterRoutes = router
