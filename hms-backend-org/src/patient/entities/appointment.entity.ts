import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("appointments")
export class Appointment
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctor_name: string;

    @Column()
    appointment_date: string;

    @Column()
    appointment_time: string;

    @Column()
    patient_email: string;

    @ManyToOne(() => User, user => user.appointment)
    user: User;

}