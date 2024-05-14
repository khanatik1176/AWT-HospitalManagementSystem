import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleMgt {
    
    @PrimaryGeneratedColumn()
    schedule_id: number;

    @Column()
    schedule_date: string;

    @Column()
    schedule_start_time: string;

    @Column()
    schedule_end_time: string;

    @Column()
    schedule_status: string;

}
