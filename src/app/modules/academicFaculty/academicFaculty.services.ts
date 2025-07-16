// import status from 'http-status';
// import ApiError from '../../../errors/ApiError';
// import { IAcademicFaculty } from './academicFaculty.interface'
// import { AcademicFaculty } from './academicFaculty.model'

// const createSemester = async (
//   payload: IAcademicFaculty,
// ): Promise<IAcademicFaculty | null> => {
//   //Semester Code Validation
//   const myTitle = payload.title;

//   if(await AcademicFaculty.findOne({title === myTitle})){
//     throw new ApiError(status.BAD_REQUEST, "⚠ Duplicate entry must not be acceptable")
//   }
//   const result = await AcademicFaculty.create(payload)
//   return result
// }

// export const AcademicFacultyServices = {
//   createSemester,
// }

import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createSemester = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const myTitle = payload.title

  const isExist = await AcademicFaculty.findOne({ title: myTitle })
  if (isExist) {
    throw new ApiError(
      status.BAD_REQUEST,
      '⚠ Duplicate entry must not be acceptable',
    )
  }

  const result = await AcademicFaculty.create(payload)
  return result
}

export const AcademicFacultyServices = {
  createSemester,
}
