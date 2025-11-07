import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PaginationQueryDto, PaginatedResponseDto } from '../../../common/dto';

/**
 * Interface for Categories Service
 */
export interface ICategoriesService {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Category>>;
  findOne(id: number): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  remove(id: number): Promise<void>;
}
