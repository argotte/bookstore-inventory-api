import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { CategoriesModule } from '../categories/categories.module';
import { BooksModule } from '../books/books.module';
import { Category } from '../categories/entities/category.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Book]),
    CategoriesModule,
    BooksModule,
  ],
  controllers: [SeederController],
  providers: [
    {
      provide: 'ISeederService',
      useClass: SeederService,
    },
  ],
  exports: ['ISeederService'],
})
export class SeederModule {}
