import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      doctorFullName: Joi.string().required(),
      doctorEmail: Joi.string().email().required(),
      doctorDateOfBirth: Joi.date().iso().required(),
      doctorAddress: Joi.string().required(),
      doctorPhoneNumber: Joi.string().pattern(/^01\d{9}$/).required().messages({
        'string.pattern.base': 'Phone number must start with 01 and be 11 digits long',
      }),
      doctorNID: Joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'NID must be exactly 10 digits long',
        'string.pattern.base': 'NID must be a valid number',
      }),
      doctorBMDCNo: Joi.string().required(),
      doctorSpeciality: Joi.string().required(),
      doctorAvailableDay: Joi.string().required(),
      doctorStartingTime: Joi.string().required(),
      doctorEndingTime: Joi.string().required(),
      doctorCommission: Joi.number().precision(2).required(),
      doctorFee: Joi.number().precision(2).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
