import { Controller, Get, Param } from '@nestjs/common';
import { S3Service } from '../services/awsService';

@Controller('images')
export class ImagesController {
  constructor(private readonly s3Service: S3Service) {}

  // Отримання списку всіх зображень
  @Get()
  async listImages(): Promise<string[]> {
    return this.s3Service.listImages();
  }

  // Отримання одного зображення за ключем
  @Get(':key')
  async getImageUrl(@Param('key') key: string): Promise<string> {
    return this.s3Service.getImageUrl(`images/${key}`);
  }
}
