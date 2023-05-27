import type IUser from '../../interfaces/IUser'

export default interface IUserModel {
  create: (user: IUser) => Promise<void>
  getUserById: (id: string) => Promise<IUser>
  deleteUser: (id: string) => Promise<boolean>
}
