import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class RepList {
    
    @PrimaryGeneratedColumn()
    rep_id: number;
    
    @Column()
    rep_name: string;
    
    @Column()
    rep_email: string;
    
    @Column()
    rep_phone: string;
    
    @Column()
    rep_address: string;
    
    @Column()
    rep_company: string;
    
    @Column({ default: 'valid' })
    rep_status: string;
    
    @CreateDateColumn({ type: 'date' })
    rep_created: string;

}
