import { Injectable } from '@nestjs/common';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  // Отримання списку файлів у директорії `images`
  async listImages(): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: 'images/', // Директорія в бакеті
    });

    const response = await this.s3.send(command);
    if (!response.Contents) {
      return [];
    }

    // Формування URL для кожного зображення
    return response.Contents.map(item => 
      `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`
    );
  }

  // Отримання одного файлу за ключем
  async getImageUrl(key: string): Promise<string> {
    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
