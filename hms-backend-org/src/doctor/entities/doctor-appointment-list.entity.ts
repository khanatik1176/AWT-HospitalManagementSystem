import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AppointmentList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctor_id: number;

    @Column()
    patient_id: number;

    @Column()
    appointment_date: string;

    @Column('time')
    appointment_time: string;

    @Column({ default: ' ' })
    additional_notes: string;

    @Column({ default: 'queued'})
    appointment_status: string;
    
}