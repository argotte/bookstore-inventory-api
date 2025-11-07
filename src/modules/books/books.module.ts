import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BooksRepository } from './repositories/books.repository';
import { IsbnUniqueConstraint } from '../../common/validators/isbn-unique.validator';
import { ExchangeRatesModule } from '../exchange-rates/exchange-rates.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    ExchangeRatesModule,
    CategoriesModule,
  ],
  controllers: [BooksController],
  providers: [
    {
      provide: 'IBooksService',
      useClass: BooksService,
    },
    {
      provide: 'IBooksRepository',
      useClass: BooksRepository,
    },
    IsbnUniqueConstraint,
  ],
  exports: ['IBooksService'],
})
export class BooksModule {}
