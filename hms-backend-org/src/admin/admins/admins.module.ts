import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../../entities/auth.entity';
import { Admin } from '../../entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminValidationMiddleware } from './create-admin-validation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Admin])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminValidationMiddleware)
      .forRoutes({ path: 'admins', method: RequestMethod.POST });
  }
}
