import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorFullName: string;

  @Column({ unique: true })
  doctorEmail: string;

  @Column({ type: 'date' })
  doctorDateOfBirth: Date;

  @Column()
  doctorAddress: string;

  @Column({ unique: true })
  doctorPhoneNumber: string;

  @Column({ unique: true })
  doctorNID: string;

  @Column({ unique: true })
  doctorBMDCNo: string;

  @Column()
  doctorSpeciality: string;

  @Column()
  doctorAvailableDay: string;

  @Column({ type: 'time' })
  doctorStartingTime: string;

  @Column({ type: 'time' })
  doctorEndingTime: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  doctorCommission: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  doctorFee: number;
}
