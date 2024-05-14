import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from 'src/entities/auth.entity';
// import { ConfigModule } from '@nestjs/config';
// import { UserModule } from 'src/user/user.module';
// import { UserService } from 'src/user/user.service';
// import { User } from 'src/entities/user.entity';
import { jwtSecrets } from './strategy/jwt.strategy';


@Module({
  imports:[TypeOrmModule.forFeature([Auth]), JwtModule.register({
    global: true,
    secret: jwtSecrets.secret,
    signOptions: { expiresIn: '20m' },
  })],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}


