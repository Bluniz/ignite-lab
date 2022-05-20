import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

//*Exports
//? Se não colocar exports, o unico modulo que vai poder usar serviço do prista será o databaseModule.
//? Com o exports, a aplicação inteira vai poder utiliza-lo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
