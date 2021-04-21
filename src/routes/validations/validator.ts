import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export class Validator {
  /**
   * Merge validationChain and validateRequest middleware.
   * @param validationChain
   */
  static val(validationChain: ValidationChain[]): RequestHandler[] {
    return [...validationChain, Validator.validateRequest];
  }
  /**
   * validate request params
   * @param request
   * @param response
   * @param next
   */
  private static validateRequest(request?: Request, response?: Response, next?: NextFunction) {
    const result = validationResult(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
      return next(new Error(<string><unknown>errors));
    }

    return next();
  }
}
