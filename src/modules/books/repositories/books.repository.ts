import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { IBooksRepository } from '../interfaces';
import { PaginationQueryDto } from '../../../common/dto';

/**
 * Implementation of IBooksRepository using TypeORM
 */
@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.repository.create(createBookDto);
    return await this.repository.save(book);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<[Book[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'DESC',
    } = paginationQuery;

    // Calculate skip value for offset pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination and sorting
    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    });

    return [data, total];
  }

  async findById(id: number): Promise<Book | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null> {
    const book = await this.findById(id);
    if (!book) {
      return null;
    }

    Object.assign(book, updateBookDto);
    return await this.repository.save(book);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
