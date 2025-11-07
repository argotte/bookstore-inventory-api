import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ICategoriesRepository } from '../interfaces';
import { BaseRepository } from '../../../common/repositories';

/**
 * Implementation of ICategoriesRepository using TypeORM
 * Extends BaseRepository for common CRUD operations
 */
@Injectable()
export class CategoriesRepository
  extends BaseRepository<Category>
  implements ICategoriesRepository
{
  constructor(
    @InjectRepository(Category)
    protected readonly repository: Repository<Category>,
  ) {
    super(repository);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = super.createEntity(createCategoryDto);
    return await super.save(category);
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.repository.findOne({ where: { name } });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    await this.repository.update(id, updateCategoryDto);
    return await this.findById(id);
  }
}
