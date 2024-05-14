import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("OrgData")
export class OrgDataEntity {

    @PrimaryColumn({name:'OrgEmail', type: 'varchar', length: 100})
    OrgEmail: string;
    @Column({name:'OrgName', type: 'varchar', length: 100 })
    OrgName: string;
    @Column({name:'OrgAddress', type: 'varchar', length: 100 })
    OrgAddress: string;
    @Column({name:'OrgContactNumber', type: 'varchar', length: 100 })
    OrgContactNumber: string;
    @Column({name:'OrgOwnerName', type: 'varchar', length: 100 })
    OrgOwnerName: string;
    @Column({name:'OrgProductPurchaseDate', type: 'date' })
    OrgProductPurchaseDate: Date;
    @Column({name:'OrgProductExpiryDate', type: 'date' })
    OrgProductExpiryDate: Date;
    @Column({name:'OrgProductPrice', type: 'decimal' })
    OrgProductPrice: number;
    @Column({name:'OrgRegistrationNumber', type: 'varchar', length: 100 })
    OrgRegistrationNumber: string;

}

