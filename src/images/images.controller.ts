import { Controller, Get, Param } from '@nestjs/common';
import { S3Service } from '../services/awsService';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imagesService: ImagesService,
  ) {}


  @Get()
  async listImages(): Promise<string[]> {
    const images = await this.imagesService.getAllImages();
    return images.map(image => image.url);
  }


  @Get(':key')
  async getImageUrl(@Param('key') key: string): Promise<string> {
    return this.imagesService.getImageUrl(key);
  }
}
