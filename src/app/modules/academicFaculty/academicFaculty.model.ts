import { model, Schema } from 'mongoose'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface'

// 2. Create a Schema corresponding to the document interface.
const AcademicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

//Make model
export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema,
)
