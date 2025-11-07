import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'ICategoriesService',
      useClass: CategoriesService,
    },
    {
      provide: 'ICategoriesRepository',
      useClass: CategoriesRepository,
    },
  ],
  exports: ['ICategoriesService', 'ICategoriesRepository'],
})
export class CategoriesModule {}
