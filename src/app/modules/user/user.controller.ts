import { Request, Response } from 'express'
import status from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.services'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body
  const result = await UserService.createUser(user)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
}
