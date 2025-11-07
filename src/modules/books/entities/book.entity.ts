import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity('books')
export class Book {
  @ApiProperty({ description: 'ID único del libro', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Título del libro', example: 'El Quijote' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Autor del libro',
    example: 'Miguel de Cervantes',
  })
  @Column({ type: 'varchar', length: 255 })
  author: string;

  @ApiProperty({ description: 'ISBN del libro', example: '978-84-376-0494-7' })
  @Column({ type: 'varchar', length: 20, unique: true })
  isbn: string;

  @ApiProperty({ description: 'Costo en USD', example: 15.99 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost_usd: number;

  @ApiProperty({
    description: 'Precio de venta en moneda local',
    example: null,
    required: false,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selling_price_local: number | null;

  @ApiProperty({ description: 'Cantidad en stock', example: 25 })
  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  @Column({ type: 'int' })
  category_id: number;

  @ApiProperty({
    description: 'Categoría del libro',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.books, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({ description: 'Código ISO del país proveedor', example: 'ES' })
  @Column({ type: 'char', length: 2 })
  supplier_country: string;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
