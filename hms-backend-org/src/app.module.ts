import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import Ormconfig from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { OrgNameStoreMiddleware } from './middleware/org-name-store';

@Module({
  imports: [TypeOrmModule.forRoot(Ormconfig),
            AuthModule
          ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(OrgNameStoreMiddleware)
//       .forRoutes('auth/signin');
//   }
// }

export class AppModule { }
