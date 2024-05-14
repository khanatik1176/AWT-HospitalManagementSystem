import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class MedicalRecord {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column({nullable:true})
  patient_email: string;

}
