import { PartialType } from '@nestjs/mapped-types';
import { CreateOrgMgtDto } from './create-org-mgt.dto';

export class UpdateOrgMgtDto extends PartialType(CreateOrgMgtDto) {}
