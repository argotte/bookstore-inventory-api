import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BooksRepository } from './repositories/books.repository';
import { IsbnUniqueConstraint } from '../../common/validators/isbn-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: 'IBooksRepository',
      useClass: BooksRepository,
    },
    IsbnUniqueConstraint,
  ],
  exports: [BooksService],
})
export class BooksModule {}
