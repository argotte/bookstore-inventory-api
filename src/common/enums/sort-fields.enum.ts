/**
 * Available sort fields for Book entities
 */
export enum BookSortFields {
  ID = 'id',
  TITLE = 'title',
  AUTHOR = 'author',
  COST_USD = 'cost_usd',
  STOCK_QUANTITY = 'stock_quantity',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

/**
 * Available sort fields for Category entities
 */
export enum CategorySortFields {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

/**
 * Sort order options
 */
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
