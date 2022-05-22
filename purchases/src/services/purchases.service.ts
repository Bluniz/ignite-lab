import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

interface CreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService,
  ) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const costumer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    this.kafkaService.emit('purchases.new-purchase', {
      customer: {
        authUserId: costumer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
