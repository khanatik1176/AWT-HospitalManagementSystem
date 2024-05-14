import { PartialType } from '@nestjs/mapped-types';
import { CreateDocFinancialDto } from './create-doc-financial.dto';

export class UpdateDocFinancialDto extends PartialType(CreateDocFinancialDto) {}
