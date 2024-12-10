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

  async listImages(): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: 'images/',
    });

    const response = await this.s3.send(command);
    if (!response.Contents) {
      return [];
    }

    return response.Contents.map(item => 
      `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`
    );
  }


  async getImageUrl(key: string): Promise<string> {
    const imageUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
    const apiUrl = process.env.API_URL || 'https://full-stack-store-one.vercel.app';
    return `${apiUrl}/images/${key}`;
  }
}
