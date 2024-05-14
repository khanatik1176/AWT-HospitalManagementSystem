import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("TenancyData")
export class TenancyDataEntity {
    
    @PrimaryColumn({name:'TenencyEmail', type: 'varchar', length: 100})
    TenancyEmail: string;
    @Column({name:'OrgRegistrationNumber', type: 'varchar', length: 100 })
    OrgRegistrationNumber: string;
    @Column({name:'OrgPackageStatus', default:true})
    OrgPackageStatus: boolean;

}