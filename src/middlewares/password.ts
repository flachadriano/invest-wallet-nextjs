import { compareSync, hashSync } from 'bcrypt';

export function encryptPassword(password: string) {
  return hashSync(password, 12);
}

export function isValidPassword(password: string | undefined, userPassword: string | undefined) {
  return password && userPassword && compareSync(password, userPassword);
}
