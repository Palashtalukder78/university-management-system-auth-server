import { model, Schema } from 'mongoose'
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface'

// 2. Create a Schema corresponding to the document interface.
const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

//Make model
export const AcademicFaculty = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema)
