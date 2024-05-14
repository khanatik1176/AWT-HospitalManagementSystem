import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("symptomCheckers")

export class SymptomChecker
{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable:true})
    symptoms_1: boolean;

    @Column({nullable:true})
    symptoms_2: boolean;

    @Column({nullable:true})
    symptoms_3: boolean;

    @Column({nullable:true})
    symptoms_4: boolean;

    @Column({nullable:true})
    symptoms_5: boolean;

    @Column({nullable:true})
    symptoms_6: boolean;

    @Column({nullable:true})
    symptoms_7: boolean;

    @Column({nullable:true})
    symptoms_8: boolean;

    @Column({nullable:true})
    symptoms_9: boolean;

    @Column({nullable:true})
    symptom_Status: string;
   
    @Column()
    patient_email: string;

    @ManyToOne(() => User, user => user.symptomChecker)
    user: User; 
}