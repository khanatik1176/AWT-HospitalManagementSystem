import { IsNotEmpty, IsString } from "class-validator";

export class UpdateHealthTrackerDto{


    @IsString()
    @IsNotEmpty()
    healthTracker_Status: string;


}


