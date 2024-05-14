import { IsEnum, IsNotEmpty } from 'class-validator';

export enum AppStatus {
    CONFIRMED = 'comfirmed',
    CANCELLED = 'cancelled'
}

export class UpdateRepAppDto {
    
    @IsNotEmpty()
    @IsEnum(AppStatus)
    app_status: AppStatus;
    
}

