import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from '../http/graphql/resolvers/products.resolver';
import * as path from 'node:path';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

//! Sempre que necessário usar env, importar o módulo de configurações do nest da biblioteca nestjs/config
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    ProductsResolver,
    ProductsService,
    PurchasesResolver,
    PurchasesService,
    CustomersService,
    CustomersResolver,
  ],
})
export class HttpModule {}
