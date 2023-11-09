import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('jsonb')
  vector: number[];
}
