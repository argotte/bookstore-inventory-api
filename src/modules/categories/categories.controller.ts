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
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ICategoriesService } from './interfaces';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('ICategoriesService')
    private readonly categoriesService: ICategoriesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'La categoría ya existe' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías',
    type: [Category],
  })
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 409, description: 'El nombre ya existe' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiResponse({
    status: 204,
    description: 'Categoría eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categoriesService.remove(+id);
  }
}
