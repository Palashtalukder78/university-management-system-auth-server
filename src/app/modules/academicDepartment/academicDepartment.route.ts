import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.get('/:id', AcademicDepartmentControllers.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentControllers.updateDepartment,
)
router.delete('/:id', AcademicDepartmentControllers.deleteDepartment)

router.get('/', AcademicDepartmentControllers.getAllDepartments)

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentControllers.createDepartment,
)

export const AcademicDepartmentRoutes = router
