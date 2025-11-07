import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../common/dto';
import { CategorySortFields } from '../../../common/enums';

/**
 * DTO for Categories pagination with specific sort fields validation
 */
export class CategoryPaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: CategorySortFields,
    default: CategorySortFields.NAME,
    example: CategorySortFields.NAME,
  })
  @IsOptional()
  @IsEnum(CategorySortFields)
  sortBy?: CategorySortFields = CategorySortFields.NAME;
}
