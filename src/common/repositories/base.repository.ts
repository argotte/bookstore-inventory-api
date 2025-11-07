import {
  Repository,
  FindOptionsWhere,
  ObjectLiteral,
  FindOptionsOrder,
  DeepPartial,
} from 'typeorm';
import { PaginationQueryDto } from '../dto';

/**
 * Abstract base repository class that provides common CRUD operations
 * Reduces code duplication across concrete repository implementations
 *
 * @template T - The entity type
 */
export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Find all entities with pagination and sorting
   * @param paginationQuery - Pagination parameters
   * @returns Tuple of [entities, total count]
   */
  async findAll(paginationQuery: PaginationQueryDto): Promise<[T[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'DESC',
    } = paginationQuery;

    const skip = (page - 1) * limit;

    // Build order object only if sortBy is provided
    const order: FindOptionsOrder<T> = sortBy
      ? ({ [sortBy]: sortOrder } as FindOptionsOrder<T>)
      : {};

    return await this.repository.findAndCount({
      skip,
      take: limit,
      order,
    });
  }

  /**
   * Find entity by ID
   * @param id - Entity ID
   * @returns Entity or null if not found
   */
  async findById(id: number): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  /**
   * Delete entity by ID
   * @param id - Entity ID
   * @returns true if deleted, false if not found
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Save entity (create or update)
   * @param entity - Entity to save
   * @returns Saved entity
   */
  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  /**
   * Create entity instance (without saving)
   * @param data - Entity data
   * @returns Entity instance
   */
  protected createEntity(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }
}
