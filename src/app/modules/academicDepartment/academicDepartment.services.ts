import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const myTitle = payload.title

  const isExist = await AcademicDepartment.findOne({ title: myTitle })
  if (isExist) {
    throw new ApiError(
      status.BAD_REQUEST,
      '⚠ Duplicate entry must not be acceptable',
    )
  }

  const result = await AcademicDepartment.create(payload)
  return result
}

export const AcademicDepartmentServices = {
  createDepartment,
}
