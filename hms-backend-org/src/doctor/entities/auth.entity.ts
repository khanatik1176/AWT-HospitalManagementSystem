import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthenticationEntity{
    
    @PrimaryColumn({name:'Email', type: 'varchar', length: 100})
    Email: string;
    @Column({ type: 'varchar' })
    password: string;
    @Column({name:'Role', type: 'varchar', length: 20 })
    Role: string;
    @Column({name:'Active',default:false})
    Active: boolean;
    
}
