import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicValidation } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)
router.get('/:id', AcademicSemesterController.getSingleSemester)
router.patch(
  '/:id',
  validateRequest(AcademicValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
)
router.delete('/:id', AcademicSemesterController.deleteSemester)
// For Update
// 1) Ensure 1: in route level -> Update: give me both/neither title and code
// 2) Ensure 2: in service level -> update: mapping title and code
router.get('/', AcademicSemesterController.getAllSemester)

export const AcademicSemesterRoutes = router
