import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { IBooksRepository } from '../interfaces';
import { PaginationQueryDto } from '../../../common/dto';
import { BaseRepository } from '../../../common/repositories';

/**
 * Implementation of IBooksRepository using TypeORM
 * Extends BaseRepository for common CRUD operations
 */
@Injectable()
export class BooksRepository
  extends BaseRepository<Book>
  implements IBooksRepository
{
  constructor(
    @InjectRepository(Book)
    protected readonly repository: Repository<Book>,
  ) {
    super(repository);
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = super.createEntity(createBookDto);
    return await super.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null> {
    const book = await this.findById(id);
    if (!book) {
      return null;
    }

    Object.assign(book, updateBookDto);
    return await super.save(book);
  }

  async findByCategory(
    categoryName: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<[Book[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = paginationQuery;

    const skip = (page - 1) * limit;

    const [data, total] = await this.repository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .where('category.name = :categoryName', { categoryName })
      .skip(skip)
      .take(limit)
      .orderBy(`book.${sortBy}`, sortOrder)
      .getManyAndCount();

    return [data, total];
  }

  async findLowStock(
    threshold: number,
    paginationQuery: PaginationQueryDto,
  ): Promise<[Book[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'stock_quantity',
      sortOrder = 'ASC',
    } = paginationQuery;

    const skip = (page - 1) * limit;

    const [data, total] = await this.repository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .where('book.stock_quantity <= :threshold', { threshold })
      .skip(skip)
      .take(limit)
      .orderBy(`book.${sortBy}`, sortOrder)
      .getManyAndCount();

    return [data, total];
  }
}
