import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthRoute } from '../middlewares/auth.middleware';

export class UserRoute {

  /**
   *
   * Used to register user
   * @param req
   * @param res
   * @param next
   */
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      await UserService.registerUser(email, password);

      AuthRoute.setAuthenticated(req, res);
    } catch (err) {
      res.status(401).end();
    }
  }

  /**
   *
   * Used to login user
   * @param req
   * @param res
   * @param next
   */
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      await UserService.loginUser(email, password);

      AuthRoute.setAuthenticated(req, res);
    } catch (err) {
      res.status(401).end();
    }
  }

  /**
   * Used to delete user
   * @param req
   * @param res
   * @param next
   */
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const userObject = await UserService.getUserByEmail(email);

      const emailId = userObject && userObject.Item && userObject.Item.email_id;

      if (emailId) {
        await UserService.deleteUser(emailId);
      } else {
        throw new Error('Unauthenticated');
      }

      res.status(204).end();
    } catch (err) {
      res.status(401).end();
    }
  }

  /**
   *
   * Change password when authenticated
   * @param req
   * @param res
   * @param next
   */
  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, newPassword, oldPassword } = req.body;

      await AuthService.changePassword(email, newPassword, oldPassword);

      res.status(200).end();
    } catch (err) {
      res.status(401).end();
    }
  }

}
