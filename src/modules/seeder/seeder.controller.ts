import { Controller, Post, Inject } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ISeederService } from './interfaces/seeder-service.interface';
import { SeederResultDto } from './dto/seeder-result.dto';

@ApiTags('Seeder')
@Controller('seeder')
export class SeederController {
  constructor(
    @Inject('ISeederService')
    private readonly seederService: ISeederService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Seed database with initial data',
    description:
      'Populates the database with categories and books. Skips items that already exist (by name for categories, by ISBN for books). Safe to run multiple times.',
  })
  @ApiResponse({
    status: 201,
    description: 'Database seeded successfully',
    type: SeederResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async seed(): Promise<SeederResultDto> {
    return this.seederService.seed();
  }
}
