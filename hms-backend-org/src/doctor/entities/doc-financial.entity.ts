import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DocFinancials {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    doctor_id: number;
    
    @Column()
    date: string;
    
    @Column()
    number_of_patients: number;
    
    @Column()
    total_earnings: number;
    
    @Column()
    doctors_commision: number;

}
