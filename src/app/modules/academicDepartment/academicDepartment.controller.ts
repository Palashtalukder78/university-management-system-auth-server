import { Request, Response } from 'express'
import status from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.services'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentServices.createDepartment(
    academicDepartmentData,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Department created successfully!',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createDepartment,
}
