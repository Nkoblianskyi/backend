import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../services/awsService';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly s3Service: S3Service,
  ) {}


  async getAllImages(): Promise<Image[]> {
    return await this.imageRepository.find();
  }


  async getImageById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new Error(`Image with ID ${id} not found`);
    }
    return image;
  }


  async getImageUrl(key: string): Promise<string> {
    const imageUrl = await this.s3Service.getImageUrl(key);
    
    const image = new Image();
    image.key = key;
    image.url = imageUrl;
    image.uploadedAt = new Date();
    await this.imageRepository.save(image);

    return imageUrl;
  }
}
