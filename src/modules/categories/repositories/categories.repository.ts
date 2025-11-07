import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ICategoriesRepository } from '../interfaces';
import { PaginationQueryDto } from '../../../common/dto';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.repository.create(createCategoryDto);
    return await this.repository.save(category);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<[Category[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'ASC',
    } = paginationQuery;
    const skip = (page - 1) * limit;

    return await this.repository.findAndCount({
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });
  }

  async findById(id: number): Promise<Category | null> {
    return await this.repository.findOne({ where: { id } });
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

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
