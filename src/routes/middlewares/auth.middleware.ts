import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CONFIG from '../../config';

export class AuthRoute {
  public static AUTHENTICATED_USER = 1;

  /**
   *
   * Used to check if is a user logged in
   * @param req
   * @param res
   * @param next
   */
  static isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const berarToken = req.headers['authorization'];

    if (!berarToken) {
      res.status(403).json({ message: 'No token provided!' });
      return;
    }

    const token = berarToken.split(' ');

    if (token.length !== 2) {
      res.status(401).json({ message: 'Unauthorized!' });
      return;
    }

    jwt.verify(token[1], CONFIG.JWT_SECRET, (err, email) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized!' });
        return;
      }

      next();
    });
  }

  /**
   *
   * Used to generate Access Token
   * @param email
   */
  static generateAccessToken(email: string): string {
   return jwt.sign({ email }, CONFIG.JWT_SECRET, { expiresIn: '1d' });
  }

  /**
   *
   * Used to set user session
   * @param req
   * @param res
   */
  static setAuthenticated(req: Request, res: Response) {
    const { email } = req.body;
    const accessToken = AuthRoute.generateAccessToken(email);

    res.status(200).json({ accessToken }).end();
  }
}
