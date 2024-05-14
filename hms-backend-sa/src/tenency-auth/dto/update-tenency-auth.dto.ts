import { PartialType } from '@nestjs/mapped-types';
import { CreateTenencyAuthDto } from './create-tenency-auth.dto';

export class UpdateTenencyAuthDto extends PartialType(CreateTenencyAuthDto) {}
