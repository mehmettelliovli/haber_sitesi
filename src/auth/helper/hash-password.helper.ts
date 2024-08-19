import * as bcrypt from 'bcrypt';

export class HashPassword {
  public static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
