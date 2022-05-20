import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

//! Colocar apenas os campos que tu acha relevante consumir no front-end

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;
  //! Quando não colocamos o @Field, impedimos que o front acesse os dados, ou seja não é possivel selecionar essa propriedade pelo graphQL
  productId: string;
}
