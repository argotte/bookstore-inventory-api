import { ApiProperty } from '@nestjs/swagger';

export class SeederResultDto {
  @ApiProperty({
    description: 'Total number of categories created',
    example: 5,
  })
  categoriesCreated: number;

  @ApiProperty({
    description: 'Total number of categories skipped (already existed)',
    example: 0,
  })
  categoriesSkipped: number;

  @ApiProperty({
    description: 'Total number of books created',
    example: 30,
  })
  booksCreated: number;

  @ApiProperty({
    description: 'Total number of books skipped (already existed)',
    example: 0,
  })
  booksSkipped: number;

  @ApiProperty({
    description: 'List of errors encountered during seeding',
    example: [],
    type: [String],
  })
  errors: string[];

  @ApiProperty({
    description: 'Overall success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Summary message',
    example: 'Database seeded successfully',
  })
  message: string;
}
