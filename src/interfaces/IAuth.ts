import { type JwtPayload } from 'jsonwebtoken'

export default interface IJWT extends JwtPayload {
  id: string
  email?: string
  crm?: string
}
