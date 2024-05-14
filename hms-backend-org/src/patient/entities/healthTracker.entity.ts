import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("healthTrackers")
export class HealthTracker 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_height: number;

    @Column()
    patient_weight: number;

    @Column()
    patient_age: number;

    @Column()
    healthTracker_Status: string;
    
    @Column('float', {nullable: true})
    patient_Bmi : number;

    @Column()
    patient_email: string;

    

}