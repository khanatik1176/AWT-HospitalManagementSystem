import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PatientPrescription {
    
    @PrimaryGeneratedColumn()
    prescription_id: number;

    @Column()
    patient_id: number;
    
    @Column() 
    doctor_id: number;
    
    @Column() 
    prescription_date: string;
    
    @Column() 
    patient_symptoms: string;
    
    @Column({ default: ' ' }) 
    patient_additional_symptoms: string;
    
    @Column({ default: ' ' }) 
    patient_additional_notes: string;
    
    @Column('json', { nullable: true })
    prescription_rx_body: {
        medicine_name: string;
        time_per_day: string;
        duration: string;
    }[];
    
    @Column({ default: ' ' }) 
    prescription_special_instruction: string;
    
    @Column({ default: ' ' }) 
    prescription_test_name: string;

}
