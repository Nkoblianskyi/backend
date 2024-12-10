import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  uploadedAt: Date;
}
