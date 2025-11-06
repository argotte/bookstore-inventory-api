import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  isbn: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost_usd: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  selling_price_local: number | null;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'char', length: 2 })
  supplier_country: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
