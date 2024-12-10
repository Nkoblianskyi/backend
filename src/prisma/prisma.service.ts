import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Метод для підключення до бази даних після ініціалізації модуля
  async onModuleInit() {
    await this.$connect(); // Підключення до бази даних
  }

  // Метод для відключення від бази даних при знищенні модуля
  async onModuleDestroy() {
    await this.$disconnect(); // Відключення від бази даних
  }
}
