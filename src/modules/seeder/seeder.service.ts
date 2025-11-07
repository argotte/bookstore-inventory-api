import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISeederService } from './interfaces/seeder-service.interface';
import { SeederResultDto } from './dto/seeder-result.dto';
import { ICategoriesService } from '../categories/interfaces/categories-service.interface';
import { IBooksService } from '../books/interfaces/books-service.interface';
import { SEED_CATEGORIES } from './data/categories.data';
import { SEED_BOOKS } from './data/books.data';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Book } from '../books/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeederService implements ISeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @Inject('ICategoriesService')
    private readonly categoriesService: ICategoriesService,
    @Inject('IBooksService')
    private readonly booksService: IBooksService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async seed(): Promise<SeederResultDto> {
    this.logger.log('Starting database seeding...');

    const result: SeederResultDto = {
      categoriesCreated: 0,
      categoriesSkipped: 0,
      booksCreated: 0,
      booksSkipped: 0,
      errors: [],
      success: true,
      message: '',
    };

    try {
      // Step 1: Seed Categories
      this.logger.log('Seeding categories...');
      await this.seedCategories(result);

      // Step 2: Seed Books (requires categories to exist)
      this.logger.log('Seeding books...');
      await this.seedBooks(result);

      // Build summary message
      result.message = this.buildSummaryMessage(result);
      this.logger.log(result.message);

      return result;
    } catch (error) {
      this.logger.error('Error during seeding:', error);
      result.success = false;
      result.errors.push(
        `Critical error: ${error instanceof Error ? error.message : String(error)}`,
      );
      result.message = 'Database seeding failed';
      return result;
    }
  }

  private async seedCategories(result: SeederResultDto): Promise<void> {
    for (const categoryData of SEED_CATEGORIES) {
      try {
        // Check if category already exists by name
        const existingCategory = await this.categoryRepository.findOne({
          where: { name: categoryData.name },
        });

        if (existingCategory) {
          this.logger.debug(
            `Category "${categoryData.name}" already exists, skipping...`,
          );
          result.categoriesSkipped++;
          continue;
        }

        // Create new category
        const dto: CreateCategoryDto = {
          name: categoryData.name,
          description: categoryData.description,
        };

        await this.categoriesService.create(dto);
        this.logger.debug(`Category "${categoryData.name}" created`);
        result.categoriesCreated++;
      } catch (error) {
        const errorMsg = `Failed to create category "${categoryData.name}": ${error instanceof Error ? error.message : String(error)}`;
        this.logger.warn(errorMsg);
        result.errors.push(errorMsg);
        // Continue to next category instead of failing completely
      }
    }
  }

  private async seedBooks(result: SeederResultDto): Promise<void> {
    // Get all categories to map names to IDs
    const categories = await this.categoryRepository.find();
    const categoryMap = new Map(categories.map((cat) => [cat.name, cat.id]));

    for (const bookData of SEED_BOOKS) {
      try {
        // Check if book already exists by ISBN
        const existingBook = await this.bookRepository.findOne({
          where: { isbn: bookData.isbn },
        });

        if (existingBook) {
          this.logger.debug(
            `Book with ISBN "${bookData.isbn}" (${bookData.title}) already exists, skipping...`,
          );
          result.booksSkipped++;
          continue;
        }

        // Get category ID from category name
        const categoryId = categoryMap.get(bookData.category_name);

        if (!categoryId) {
          const errorMsg = `Category "${bookData.category_name}" not found for book "${bookData.title}"`;
          this.logger.warn(errorMsg);
          result.errors.push(errorMsg);
          result.booksSkipped++;
          continue;
        }

        // Create new book
        const dto: CreateBookDto = {
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn,
          cost_usd: bookData.cost_usd,
          stock_quantity: bookData.stock_quantity,
          category_id: categoryId,
          supplier_country: bookData.supplier_country,
        };

        await this.booksService.create(dto);
        this.logger.debug(`Book "${bookData.title}" created`);
        result.booksCreated++;
      } catch (error) {
        const errorMsg = `Failed to create book "${bookData.title}": ${error instanceof Error ? error.message : String(error)}`;
        this.logger.warn(errorMsg);
        result.errors.push(errorMsg);
        // Continue to next book instead of failing completely
      }
    }
  }

  private buildSummaryMessage(result: SeederResultDto): string {
    const parts: string[] = [];

    parts.push(
      `Categories: ${result.categoriesCreated} created, ${result.categoriesSkipped} skipped`,
    );
    parts.push(
      `Books: ${result.booksCreated} created, ${result.booksSkipped} skipped`,
    );

    if (result.errors.length > 0) {
      parts.push(`Errors: ${result.errors.length}`);
    }

    const summary = parts.join(' | ');

    if (result.errors.length === 0) {
      return `Database seeded successfully. ${summary}`;
    } else {
      return `Database seeded with some errors. ${summary}`;
    }
  }
}
