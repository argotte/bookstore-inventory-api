import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../books/entities/book.entity';

/**
 * Category entity for book categorization
 */
@Entity('categories')
export class Category {
  @ApiProperty({ description: 'ID único de la categoría', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Literatura Clásica',
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Obras literarias clásicas y atemporales',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
