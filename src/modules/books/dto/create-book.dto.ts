import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  Matches,
  Length,
  IsInt,
} from 'class-validator';
import { IsIsbnUnique } from '../../../common/validators/isbn-unique.validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Título del libro',
    example: 'El Quijote',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Autor del libro',
    example: 'Miguel de Cervantes',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @ApiProperty({
    description: 'ISBN del libro (formato internacional)',
    example: '978-84-376-0494-7',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^(?:\d{9}[\dX]|\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-[\dX])$/, {
    message: 'ISBN debe tener un formato válido (10 o 13 dígitos)',
  })
  @IsIsbnUnique()
  isbn: string;

  @ApiProperty({
    description: 'Costo del libro en USD',
    example: 15.99,
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'cost_usd debe ser mayor a 0' })
  cost_usd: number;

  @ApiProperty({
    description: 'Precio de venta en moneda local (opcional)',
    example: null,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  selling_price_local?: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 25,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stock_quantity: number;

  @ApiProperty({
    description: 'Categoría del libro',
    example: 'Literatura Clásica',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @ApiProperty({
    description: 'Código ISO del país del proveedor (2 letras)',
    example: 'ES',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, {
    message: 'supplier_country debe ser un código ISO de 2 letras mayúsculas',
  })
  supplier_country: string;
}
