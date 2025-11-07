import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchByCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría para filtrar',
    example: 'Programming',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    default: 'created_at',
    example: 'created_at',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'created_at';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    example: 'DESC',
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
