import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const corsOptions: CorsOptions = {
    origin: true, // You can replace '*' with your frontend domain
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
  };

  app.enableCors(corsOptions)


  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1800000
      }
    })
  );
  
  await app.listen(5500);
}
bootstrap();
