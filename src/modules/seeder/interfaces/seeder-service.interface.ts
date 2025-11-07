import { SeederResultDto } from '../dto/seeder-result.dto';

export interface ISeederService {
  /**
   * Seed the database with initial data (categories and books)
   * @returns SeederResultDto with statistics of created/skipped items
   */
  seed(): Promise<SeederResultDto>;
}
