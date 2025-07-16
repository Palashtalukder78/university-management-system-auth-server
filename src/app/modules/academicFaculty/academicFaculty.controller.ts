import { Request, Response } from 'express'
import status from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.services'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result =
    await AcademicFacultyServices.createSemester(academicFacultyData)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculty created successfully!',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createFaculty,
}
