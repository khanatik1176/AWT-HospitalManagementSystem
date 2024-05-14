import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Appointment } from "./appointment.entity";
import { Feedback } from "./feedback.entity";
import { SymptomChecker } from "./symptomChecker.entity";




@Entity()

export class User
{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable:true})
    patient_fullname: string;

    @Column({nullable:true})
    patient_email: string;

    @Column({nullable:true})
    patient_date_of_birth: string;

    @Column({nullable:true})
    patient_address: string;

    @Column({nullable:true})
    patient_phone_number: string;

    @Column({nullable:true})
    patient_NID: string;

    @Column({nullable:true})
    patient_password: string;


    @OneToMany(() => Appointment, appointment => appointment.patient_email)
    appointment: Appointment[];

    @OneToMany(() => Feedback, feedback => feedback.patient_email)
    feedback: Feedback[];

    @OneToMany(() => SymptomChecker, symptomChecker => symptomChecker.patient_email)
    symptomChecker: SymptomChecker[];
}