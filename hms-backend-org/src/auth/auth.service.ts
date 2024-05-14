import { Injectable } from '@nestjs/common';
//import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth.entity';
import { Repository } from 'typeorm';
//import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Session } from 'express-session';
import { UpdateAuthDto } from './dto/update-auth.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth)
        private authRepo: Repository<Auth>,
        //private userService: UserService,
        private jwtService: JwtService
    ) {}



    // async signUp(createUserDto: CreateUserDto)
    // {
    //     const user = await this.userService.createUser(createUserDto);
    //     const auth = await this.authRepo.create({email: user.patient_email, password: user.patient_password, role:'patient'});
    //     await this.authRepo.save(auth);
        
    //     console.log("Signup Successful");

    //     return {auth, user};
    // }

    async findOne(data: any) {
        const value = parseInt(data);
        if (Number.isInteger(value)) {
          return await this.authRepo.findOne({
            where: { id: parseInt(data) },
          });
        }
        return await this.authRepo.findOne({ where: { email: data } });
      }


    async logIn(login_data: any)
    {
      console.log("Stored DB name: ", process.env.DATABASE_NAME);
      console.log("Login Data: ", login_data.email);  
      const user_data = await this.authRepo.findOne({where: {email: login_data.email}});

        if(!user_data)
        {
            throw new Error('Invalid Credentials on 54');
        }
        const payload = {email: user_data.email, role: user_data.role};

        if(user_data && (await bcrypt.compare(login_data.password, user_data.password)))
        {
          console.log("Login Successful");

           const token = await this.jwtService.signAsync(payload);
           return {token, user_data};
        }
        throw new Error('Invalid Credentials on 65');
    }

    async forgetPassword(id:number, updateAuthDto: UpdateAuthDto)
    {
      console.log("Password is chnaged successfully ");

      return await this.authRepo.update(id,updateAuthDto);
    }
}
