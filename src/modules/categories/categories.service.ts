import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoriesService, ICategoriesRepository } from './interfaces';
import { PaginationQueryDto, PaginatedResponseDto } from '../../common/dto';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Check if category already exists
    const existing = await this.categoriesRepository.findByName(
      createCategoryDto.name,
    );
    if (existing) {
      throw new ConflictException(
        `Category with name "${createCategoryDto.name}" already exists`,
      );
    }

    return await this.categoriesRepository.create(createCategoryDto);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Category>> {
    const [data, total] =
      await this.categoriesRepository.findAll(paginationQuery);
    return new PaginatedResponseDto<Category>(
      data,
      total,
      paginationQuery.page ?? 1,
      paginationQuery.limit ?? 10,
    );
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoriesRepository.findByName(name);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    // Check if name is being changed and if new name already exists
    if (updateCategoryDto.name) {
      const existing = await this.categoriesRepository.findByName(
        updateCategoryDto.name,
      );
      if (existing && existing.id !== id) {
        throw new ConflictException(
          `Category with name "${updateCategoryDto.name}" already exists`,
        );
      }
    }

    const category = await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    );
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.categoriesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
