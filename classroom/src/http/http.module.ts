import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import * as path from 'node:path';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesService } from '../services/courses.service';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';

//! Sempre que necessário usar env, importar o módulo de configurações do nest da biblioteca nestjs/config
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    CoursesResolver,
    StudentsResolver,
    EnrollmentsResolver,
    CoursesService,
    StudentsService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
