import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("feedbacks")
export class Feedback
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    patient_feedback:string;

    @Column()
    patient_rating:number;

    @Column()
    feedback_date:string;

    @Column()
    patient_email: string;

    @ManyToOne(() => User, user => user.feedback)
    user: User;
}