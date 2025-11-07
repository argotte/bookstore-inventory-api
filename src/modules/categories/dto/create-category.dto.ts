import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Literatura Clásica',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la categoría',
    example: 'Obras literarias clásicas y atemporales',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
