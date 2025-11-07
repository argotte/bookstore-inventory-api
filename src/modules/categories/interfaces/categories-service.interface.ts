import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

/**
 * Interface for Categories Service
 */
export interface ICategoriesService {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  remove(id: number): Promise<void>;
}
