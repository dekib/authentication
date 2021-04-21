import { passwordUtils } from '../utils/password.utils';
import { AuthService } from './auth.service';
import { UserItem } from '../entities/user.entity';
import { DBService } from './AWS/DB';

export class UserService {

  /**
   * Returns the user.
   * @param email
   */
  static async getUserByEmail(email: string): Promise<UserItem> {
    return DBService.read(email);
  }

  /**
   * Used to login user to our platform
   * @param email
   * @param password
   */
  static async loginUser(email: string, password: string): Promise<void> {
    const user = await UserService.getUserByEmail(email);

    const email_id = user && user.Item && user.Item.email_id;

    if (!email_id) {
      throw new Error('Unauthenticated');
    }

    const ok = await AuthService.checkPassword(email_id, password);

    if (!ok) {
      throw new Error('Unauthenticated');
    }
  }

  /**
   *
   * Delete user by id
   * @param email Cancels account id
   */
  static async deleteUser(email: string): Promise<void> {
    await DBService.delete(email);
  }

  /**
   * Used to register new user on our platform
   * @param email
   * @param password
   */
  static async registerUser(email: string, password: string): Promise<UserItem> {

    const alreadyExists = await UserService.getUserByEmail(email);

    const email_id = alreadyExists && alreadyExists.Item && alreadyExists.Item.email_id;

    if (email_id) {
      throw new Error(`User with email: ${email} already exists.`);
    }

    const hash = await passwordUtils.createHash(password);

    return DBService.create(email, hash);
  }

}
