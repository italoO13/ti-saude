import type IUser from '../../interfaces/IUser'

export default interface IUserService {
  create: (user: IUser) => Promise<void>
}
