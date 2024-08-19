import * as bcrypt from 'bcrypt';

export class PasswordValidator {
  public static async validatePassword(
    password: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
