import type IUser from '../../interfaces/IUser'

export default interface IUserModel {
  create: (user: IUser) => Promise<void>
}
