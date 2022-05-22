import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrrolment';

@ObjectType('User')
@Directive('@extends') //! Vou extender o usuário do serviço pai, adicionando novas coisas. Nesse caso do serviço de purchases
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external') //! É uma informação que vem de forma externa, ela existe fora desse serviço
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
