import bcrypt from 'bcryptjs'

const crypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 8)
}

const validatePassword = async (passwordEncript: string, passwordDecript: string): Promise<boolean> => {
  const compare = await bcrypt.compare(passwordEncript, passwordDecript)
  return compare
}

export default {
  crypt,
  validatePassword
}
