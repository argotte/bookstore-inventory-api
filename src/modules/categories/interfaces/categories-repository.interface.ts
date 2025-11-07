import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PaginationQueryDto } from '../../../common/dto';

/**
 * Interface for Categories Repository
 */
export interface ICategoriesRepository {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(paginationQuery: PaginationQueryDto): Promise<[Category[], number]>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null>;
  delete(id: number): Promise<boolean>;
}
