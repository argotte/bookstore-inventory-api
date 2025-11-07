import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { CalculatePriceDto } from '../dto/calculate-price.dto';
import { Book } from '../entities/book.entity';
import { PaginationQueryDto, PaginatedResponseDto } from '../../../common/dto';

/**
 * Response interface for price calculation
 */
export interface CalculatePriceResponse {
  bookId: number;
  title: string;
  costUsd: number;
  targetCurrency: string;
  exchangeRate: number;
  profitMargin: number;
  suggestedPrice: number;
  calculatedAt: Date;
}

/**
 * Interface for Books Service
 * Defines the contract for book business logic operations
 */
export interface IBooksService {
  /**
   * Create a new book
   */
  create(createBookDto: CreateBookDto): Promise<Book>;

  /**
   * Find all books with pagination
   */
  findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Book>>;

  /**
   * Find a book by ID
   * @throws NotFoundException if book doesn't exist
   */
  findOne(id: number): Promise<Book>;

  /**
   * Update a book
   * @throws NotFoundException if book doesn't exist
   */
  update(id: number, updateBookDto: UpdateBookDto): Promise<Book>;

  /**
   * Remove a book
   * @throws NotFoundException if book doesn't exist
   */
  remove(id: number): Promise<void>;

  /**
   * Calculate suggested selling price for a book
   * @throws NotFoundException if book doesn't exist
   * @throws ServiceUnavailableException if exchange rate service is unavailable
   */
  calculatePrice(
    id: number,
    calculatePriceDto: CalculatePriceDto,
  ): Promise<CalculatePriceResponse>;
}
