import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  atmosphere: string;

  @Column('jsonb')
  vector: number[];
}
