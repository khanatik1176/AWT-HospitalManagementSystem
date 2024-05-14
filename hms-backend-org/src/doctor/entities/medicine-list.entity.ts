import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MedicineList {

    @PrimaryGeneratedColumn()
    med_id: number;

    @Column()
    med_name: string;

    @Column()
    med_type: string;

    @Column()
    med_generic: string;

    @Column()
    med_qty_per_strip: number;

    @Column()
    med_strip_per_box: number;

    @Column()
    med_manufacturer: string;

    @Column({ default: ' ' })
    med_description: string;

    @Column({ default: 'available' })
    med_status: string;

    @Column({ default: ' ' })
    med_image_original_name: string;

    @Column({ default: ' ' })
    med_image_file_name: string;

}
