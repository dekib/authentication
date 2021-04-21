import { passwordUtils } from '../utils/password.utils';
import { DBService } from './AWS/DB';

export class AuthService {

  /**
   * Returns a boolean whether or not the password is correct
   * @param emailId User id
   * @param password Password
   */
  static async checkPassword (emailId: string, password: string): Promise<boolean> {
    const userAuth = await DBService.read(emailId);

    const hashPassword = userAuth && userAuth.Item && userAuth.Item.hashPassword;
    return passwordUtils.check(password, hashPassword);
  }

  /**
   *
   * Sets new password.
   * @param emailId User id
   * @param password Password to set.
   */
  static async setPassword(emailId: string, password: string): Promise<void> {
    const hashPassword = await passwordUtils.createHash(password);

    await DBService.update(emailId, hashPassword);
  }

  /**
   *
   * Facade which changes old password to a new one or throws adequate errors.
   * @param emailId User id
   * @param newPassword New password
   * @param oldPassword Old password
   */
  static async changePassword(emailId: string, newPassword: string, oldPassword: string): Promise<void> {
    const ok = await AuthService.checkPassword(emailId, oldPassword);

    if (!ok) {
      throw new Error('Old password not correct!');
    }

    await AuthService.setPassword(emailId, newPassword);
  }

}
