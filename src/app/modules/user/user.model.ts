import { model, Schema } from 'mongoose'
import { IUser, UserModel } from './user.interface'

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

//Make model
export const User = model<IUser, UserModel>('User', userSchema)
