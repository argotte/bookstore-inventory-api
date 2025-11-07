import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { SearchByCategoryDto } from './dto/search-by-category.dto';
import { LowStockQueryDto } from './dto/low-stock-query.dto';
import {
  IBooksService,
  IBooksRepository,
  CalculatePriceResponse,
} from './interfaces';
import { PaginationQueryDto, PaginatedResponseDto } from '../../common/dto';
import { IExchangeRatesService } from '../exchange-rates/interfaces';
import { ICategoriesService } from '../categories/interfaces';

/**
 * Implementation of IBooksService
 * Contains business logic for book operations
 */
@Injectable()
export class BooksService implements IBooksService {
  constructor(
    @Inject('IBooksRepository')
    private readonly booksRepository: IBooksRepository,
    @Inject('IExchangeRatesService')
    private readonly exchangeRatesService: IExchangeRatesService,
    @Inject('ICategoriesService')
    private readonly categoriesService: ICategoriesService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Validate that category exists
    await this.categoriesService.findOne(createBookDto.category_id);
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
    // Validate that category exists if being updated
    if (updateBookDto.category_id) {
      await this.categoriesService.findOne(updateBookDto.category_id);
    }

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

  async calculatePrice(
    id: number,
    calculatePriceDto: CalculatePriceDto,
  ): Promise<CalculatePriceResponse> {
    // Find the book
    const book = await this.findOne(id);

    // Get exchange rate from external API
    const exchangeRate = await this.exchangeRatesService.getExchangeRate(
      calculatePriceDto.targetCurrency,
    );

    // Calculate suggested price
    // Formula: (cost_usd * exchange_rate) * (1 + profit_margin/100)
    const profitMargin = calculatePriceDto.profitMargin ?? 30;
    const basePriceInTargetCurrency = book.cost_usd * exchangeRate;
    const suggestedPrice = basePriceInTargetCurrency * (1 + profitMargin / 100);

    return {
      bookId: book.id,
      title: book.title,
      costUsd: book.cost_usd,
      targetCurrency: calculatePriceDto.targetCurrency.toUpperCase(),
      exchangeRate,
      profitMargin,
      suggestedPrice: Math.round(suggestedPrice * 100) / 100, // Round to 2 decimals
      calculatedAt: new Date(),
    };
  }

  async findByCategory(
    searchDto: SearchByCategoryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    const { category, page = 1, limit = 10, sortBy, sortOrder } = searchDto;
    const [data, total] = await this.booksRepository.findByCategory(category, {
      page,
      limit,
      sortBy,
      sortOrder,
    });
    return new PaginatedResponseDto<Book>(data, total, page, limit);
  }

  async findLowStock(
    queryDto: LowStockQueryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    const {
      threshold = 10,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
    } = queryDto;
    const [data, total] = await this.booksRepository.findLowStock(threshold, {
      page,
      limit,
      sortBy,
      sortOrder,
    });
    return new PaginatedResponseDto<Book>(data, total, page, limit);
  }
}
