import { IsAlpha, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export enum MedType {
    TABLET = 'tablet',
    CAPSULE = 'capsule',
    SYRUP = 'syrup',
    INJECTION = 'injection',
    DROPS = 'drops',
    CREAM = 'cream',
    OINTMENT = 'ointment'
}

export class CreateMedicineListDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9 .]*$/, { message: 'Medicine Name can only contain letters, spaces, and periods', })
    med_name: string;

    @IsNotEmpty()
    @IsEnum(MedType)
    med_type: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Medicine Generic can only contain letters, spaces, and periods', })
    med_generic: string;

    @IsNumber()
    @IsNotEmpty()
    med_qty_per_strip: number;

    @IsNumber()
    @IsNotEmpty()
    med_strip_per_box: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z .]*$/, { message: 'Medicine Manufacturer can only contain letters, spaces, and periods', })
    med_manufacturer: string;

    @IsString()
    @IsOptional()
    med_description: string;

    @IsString()
    @IsOptional()
    med_image: string;

}
