import { IsEmail, IsNotEmpty, IsString, Matches, IsPhoneNumber, IsDate, IsDecimal } from "class-validator";

export class CreateOrgMgtDto {
    
    @IsEmail()
    @IsNotEmpty()
    OrgEmail: string;

    @IsString({ message: 'Please enter a representative valid name' })
    @IsNotEmpty()
    OrgName: string;

    @IsString()
    @IsNotEmpty()
    OrgAddress: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('BD')
    OrgContactNumber: string;

    @IsString({ message: 'Please enter a representative valid name' })
    @IsNotEmpty()
    OrgOwnerName: string;

    @IsNotEmpty()
    @IsString()
    OrgProductPurchaseDate: Date | string;
  
    @IsNotEmpty()
    @IsString()
    OrgProductExpiryDate: Date | string;

    @IsDecimal()
    @IsNotEmpty()
    OrgProductPrice: number;

    @IsString()
    @IsNotEmpty()
    OrgRegistrationNumber: string;
    
}
