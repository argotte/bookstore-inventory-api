import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../modules/books/entities/book.entity';

/**
 * Interface for objects that may have an ID (for update operations)
 */
interface EntityWithId {
  id?: number;
}

/**
 * Custom validator to check if ISBN already exists in database
 */
@Injectable()
@ValidatorConstraint({ name: 'IsbnUnique', async: true })
export class IsbnUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async validate(isbn: string, args: ValidationArguments): Promise<boolean> {
    // Extract the book ID from the object being validated (for updates)
    const object = args.object as EntityWithId;
    const bookId = object.id;

    const existingBook = await this.bookRepository.findOne({
      where: { isbn },
    });

    // If no book found, ISBN is unique
    if (!existingBook) {
      return true;
    }

    // If updating the same book, allow the same ISBN
    if (bookId && existingBook.id === bookId) {
      return true;
    }

    // ISBN already exists for a different book
    return false;
  }

  defaultMessage(): string {
    return 'A book with this ISBN already exists';
  }
}

/**
 * Decorator to validate ISBN uniqueness
 * @param validationOptions
 */
export function IsIsbnUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsbnUniqueConstraint,
    });
  };
}
