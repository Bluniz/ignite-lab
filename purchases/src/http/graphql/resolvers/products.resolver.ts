import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../input/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}
  //! Sempre que eu for retornar uma informação que ela for uma estrutura de dados não primitiva, algo não tão simples
  //! Se é criado um model para representa-lo.
  //? Essa é a forma que o GraphQL entende
  //? Sempre que estiver buscando uma lista, é necessário dizer quais campos eu quero.
  //! Evitar fazer as queries dentro dos resolvers
  @Query(() => [Product]) //! Retorno é um array de produtos
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  //! Quando estamos cadastrando algo pelo graphQL, utilizamos uma mutation
  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
