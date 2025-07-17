import status from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationsHelper } from '../../../helpers/paginationsHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/paginations'
import { academicFacultySearchableFields } from './academicFaculty.constant'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
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

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationsHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()
  return {
    meta: { page, limit, total },
    data: result,
  }
}

const getSingleFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const myTitle = payload.title
  const isExist = await AcademicFaculty.findOne({ title: myTitle })
  if (isExist) {
    throw new ApiError(
      status.BAD_REQUEST,
      '⚠ Duplicate entry must not be acceptable',
    )
  }

  if (!payload.title) {
    throw new ApiError(status.BAD_REQUEST, '⚠ The title must not be empty')
  }
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicFacultyServices = {
  createSemester,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
}
