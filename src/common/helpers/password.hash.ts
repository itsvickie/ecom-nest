import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private readonly saltRounds = Math.floor(Math.random() * 20);

  async hashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  async comparePassword(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}
