import { Request, Response } from 'express'
import status from 'http-status'
import { paginationFields } from '../../../constsnts/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicFacultyFilterableFields } from './academicFaculty.constant'
import { IAcademicFaculty } from './academicFaculty.interface'
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

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyServices.getAllFaculties(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Retirieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicFacultyServices.getSingleFaculty(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Semester Retirieved successfully!',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
}
