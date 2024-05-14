import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class AdminValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      adminFullName: Joi.string().required(),
      adminEmail: Joi.string().email().required(),
      adminDateOfBirth: Joi.date().iso().required(),
      adminAddress: Joi.string().required(),
      adminPhoneNumber: Joi.string().pattern(/^01\d{9}$/).required().messages({
        'string.pattern.base': 'Phone number must start with 01 and be 11 digits long',
      }),
      adminNID: Joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'NID must be exactly 10 digits long',
        'string.pattern.base': 'NID must be a valid number',
      }),
      adminRole: Joi.string().required(),
      adminSalary: Joi.number().precision(2).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    next();
  }
}