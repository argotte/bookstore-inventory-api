import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  Length,
} from 'class-validator';

/**
 * DTO for calculating suggested selling price
 */
export class CalculatePriceDto {
  @ApiProperty({
    description: 'Target currency code (ISO 4217)',
    example: 'ARS',
    minLength: 3,
    maxLength: 3,
  })
  @IsString()
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  targetCurrency: string;

  @ApiPropertyOptional({
    description: 'Profit margin percentage (default: 30%)',
    example: 30,
    minimum: 0,
    maximum: 100,
    default: 30,
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Profit margin cannot be negative' })
  @Max(100, { message: 'Profit margin cannot exceed 100%' })
  profitMargin?: number = 30;
}
