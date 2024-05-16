import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const user_data = await this.userRepo.create(createUserDto);
        return await this.userRepo.save(user_data);
    }

    async findAllByEmail(email: string) {
        return await this.userRepo.find({ where: { patient_email : email } });
    }

    async findAllById(id: number) {
        return await this.userRepo.find({ where: { id : id } });
    }
}