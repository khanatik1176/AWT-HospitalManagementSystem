import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as bcrypt from 'bcryptjs';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column()
  role: string;

  @Column()
  active: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async updateHash()
  {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
