import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ICategoriesRepository } from '../interfaces';

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

  async findAll(): Promise<Category[]> {
    return await this.repository.find({
      order: { name: 'ASC' },
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
