import { Request, Response } from 'express'
import status from 'http-status'
import { paginationFields } from '../../../constsnts/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.services'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester created successfully!',
    data: result,
  })
})

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Retirieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Semester Retirieved successfully!',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updateData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Updated successfully!',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester deleted successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
