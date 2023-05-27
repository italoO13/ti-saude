import type IUser from '../../interfaces/IUser'

export default interface ILoginModel {
  findOne: (email: string) => Promise<IUser>
}
