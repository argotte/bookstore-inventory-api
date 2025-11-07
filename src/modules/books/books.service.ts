import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBooksService, IBooksRepository } from './interfaces';
import { PaginationQueryDto, PaginatedResponseDto } from '../../common/dto';

/**
 * Implementation of IBooksService
 * Contains business logic for book operations
 */
@Injectable()
export class BooksService implements IBooksService {
  constructor(
    @Inject('IBooksRepository')
    private readonly booksRepository: IBooksRepository,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksRepository.create(createBookDto);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    const [data, total] = await this.booksRepository.findAll(paginationQuery);
    return new PaginatedResponseDto<Book>(
      data,
      total,
      paginationQuery.page ?? 1,
      paginationQuery.limit ?? 10,
    );
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.update(id, updateBookDto);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.booksRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
