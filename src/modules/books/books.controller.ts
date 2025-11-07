import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { SearchByCategoryDto } from './dto/search-by-category.dto';
import { LowStockQueryDto } from './dto/low-stock-query.dto';
import { BookPaginationQueryDto } from './dto/book-pagination-query.dto';
import { Book } from './entities/book.entity';
import { PaginatedResponseDto } from '../../common/dto';
import { IBooksService, CalculatePriceResponse } from './interfaces';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject('IBooksService')
    private readonly booksService: IBooksService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({
    status: 201,
    description: 'Libro creado exitosamente',
    type: Book,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los libros con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de libros',
    type: PaginatedResponseDto<Book>,
  })
  async findAll(
    @Query() paginationQuery: BookPaginationQueryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    return await this.booksService.findAll(paginationQuery);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Buscar libros por categoría',
    description:
      'Busca libros que pertenezcan a una categoría específica con paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de libros filtrados por categoría',
    type: PaginatedResponseDto<Book>,
  })
  async searchByCategory(
    @Query() searchDto: SearchByCategoryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    return await this.booksService.findByCategory(searchDto);
  }

  @Get('low-stock')
  @ApiOperation({
    summary: 'Obtener libros con stock bajo',
    description:
      'Retorna libros cuyo stock sea menor o igual al umbral especificado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de libros con stock bajo',
    type: PaginatedResponseDto<Book>,
  })
  async getLowStock(
    @Query() queryDto: LowStockQueryDto,
  ): Promise<PaginatedResponseDto<Book>> {
    return await this.booksService.findLowStock(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiResponse({
    status: 200,
    description: 'Libro encontrado',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async findOne(@Param('id') id: string): Promise<Book> {
    return await this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({
    status: 200,
    description: 'Libro actualizado exitosamente',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un libro' })
  @ApiResponse({ status: 204, description: 'Libro eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.booksService.remove(+id);
  }

  @Post(':id/calculate-price')
  @ApiOperation({
    summary: 'Calcular precio de venta sugerido',
    description:
      'Calcula el precio de venta sugerido en la moneda especificada usando tasas de cambio en tiempo real de una API externa',
  })
  @ApiBody({ type: CalculatePriceDto })
  @ApiResponse({
    status: 200,
    description: 'Precio calculado exitosamente',
    schema: {
      type: 'object',
      properties: {
        bookId: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Clean Code' },
        costUsd: { type: 'number', example: 45.0 },
        targetCurrency: { type: 'string', example: 'ARS' },
        exchangeRate: { type: 'number', example: 1000.0 },
        profitMargin: { type: 'number', example: 30 },
        suggestedPrice: { type: 'number', example: 58500.0 },
        calculatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  @ApiResponse({
    status: 503,
    description: 'Servicio de tasas de cambio no disponible',
  })
  async calculatePrice(
    @Param('id') id: string,
    @Body() calculatePriceDto: CalculatePriceDto,
  ): Promise<CalculatePriceResponse> {
    return await this.booksService.calculatePrice(+id, calculatePriceDto);
  }
}
