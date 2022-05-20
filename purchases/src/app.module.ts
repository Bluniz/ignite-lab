import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
//? Estrutura do Nest
//* Módulo Agrupamento de arquivos.
//* Controllers -> Rotas que chamam os Services

@Module({
  //! Um módulo pode importar outros sub-módulos.
  //* Mesmo esquema de quando fazemos um arquivo index.ts para exportar de forma unica todos os arquivos...
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  //? Qualquer outro arquivo que tenha algum tipo de funcionalidade!
  providers: [],
})
export class AppModule {}
