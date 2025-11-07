import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../common/dto';
import { BookSortFields } from '../../../common/enums';

/**
 * DTO for Books pagination with specific sort fields validation
 */
export class BookPaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: BookSortFields,
    default: BookSortFields.CREATED_AT,
    example: BookSortFields.TITLE,
  })
  @IsOptional()
  @IsEnum(BookSortFields)
  sortBy?: BookSortFields = BookSortFields.CREATED_AT;
}
