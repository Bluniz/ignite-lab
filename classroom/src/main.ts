import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });
  //! Conectar microserviços demora um pouco mais.
  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservice is running');
  });
  app.listen(3334).then(() => {
    console.log('http server is running');
  });
}
bootstrap();

//? Backend

//! Purchases
//! Classroom

//? frontend

//! Web

/* 
  ! Apollo Federation cria um gateway para que o frontend possa acessar um unico endereço, 
  ! ele se comunica com os outros micro-serviços de acordo com o que é necessário.
*/
