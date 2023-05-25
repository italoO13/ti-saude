import bcrypt from 'bcryptjs'

const crypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 8)
}

export default crypt
