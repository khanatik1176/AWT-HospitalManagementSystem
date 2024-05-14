import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adminFullName: string;

  @Column({ unique: true })
  adminEmail: string;

  @Column({ type: 'date' })
  adminDateOfBirth: Date;

  @Column()
  adminAddress: string;

  @Column({ unique: true })
  adminPhoneNumber: string;

  @Column({ unique: true })
  adminNID: string;

  @Column()
  adminRole: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  adminSalary: number;
}
