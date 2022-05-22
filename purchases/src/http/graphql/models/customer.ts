import { Field, ObjectType, ID, Directive } from '@nestjs/graphql';
import { Purchase } from './purchases';

@ObjectType('User') //! Necessário dar nomes em comum
@Directive('@key(fields: "authUserId")') //! Preciso dizer pro graphQL qual é a chave em comum entre entidades iguais com nomes diferentes: Ex -> Student e Consumer
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
