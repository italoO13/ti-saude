export default interface ILoginService {
  createSession: (email: string, password: string) => Promise<string>
}
