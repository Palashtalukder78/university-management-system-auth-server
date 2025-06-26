import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUSer = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUSer?.id
}
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000
  //incvrement by 1
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementId
}
