import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { PaginationQueryDto } from '../../../common/dto';

/**
 * Interface for Books Repository
 * Defines the contract for data access operations
 */
export interface IBooksRepository {
  /**
   * Create and save a new book
   */
  create(createBookDto: CreateBookDto): Promise<Book>;

  /**
   * Find all books with pagination
   * @returns Tuple of [books, total count]
   */
  findAll(paginationQuery: PaginationQueryDto): Promise<[Book[], number]>;

  /**
   * Find a book by ID
   * @returns Book or null if not found
   */
  findById(id: number): Promise<Book | null>;

  /**
   * Update a book
   * @returns Updated book or null if not found
   */
  update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null>;

  /**
   * Delete a book by ID
   * @returns true if deleted, false if not found
   */
  delete(id: number): Promise<boolean>;

  /**
   * Find books by category name with pagination
   * @returns Tuple of [books, total count]
   */
  findByCategory(
    categoryName: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<[Book[], number]>;

  /**
   * Find books with stock below threshold with pagination
   * @returns Tuple of [books, total count]
   */
  findLowStock(
    threshold: number,
    paginationQuery: PaginationQueryDto,
  ): Promise<[Book[], number]>;
}
