import { Request, Response } from 'express'
import status from 'http-status'
import { paginationFields } from '../../../constsnts/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { IAcademicDepartment } from './academicDepartment.interface'
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

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentServices.getAllDepartments(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Retirieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicDepartmentServices.getSingleDepartment(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Semester Retirieved successfully!',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
}
