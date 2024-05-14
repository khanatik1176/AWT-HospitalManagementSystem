import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum MedStatus {
    AVAILABLE = 'available',
    NOT_AVAILABLE = 'not available',
    OUT_OFF_PRODUCTION = 'out of production'
}

export class UpdateMedicineListDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEnum(MedStatus)
    med_status: string;
    
}


