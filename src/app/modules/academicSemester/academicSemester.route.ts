import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { AcademicValidation } from './academicSemester.validation'
// import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(AcademicValidation.createAcademicSemesterZodSchema),
  // UserController.createUser,
)

export const UserRoutes = router
