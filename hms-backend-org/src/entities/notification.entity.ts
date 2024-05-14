import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  recipientType: 'doctor' | 'patient' | 'both';

  @CreateDateColumn()
  createdAt: Date;
}
