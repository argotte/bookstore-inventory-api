import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

/**
 * Interface for HTTP exception response
 */
interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

/**
 * Interface for PostgreSQL error
 */
interface PostgresError extends Error {
  code?: string;
  detail?: string;
  table?: string;
  constraint?: string;
}

/**
 * Global exception filter for consistent error handling
 * Handles HTTP exceptions, database errors, and unexpected errors
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let error = 'Internal Server Error';

    // Handle HttpException (400, 404, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const httpResponse = exceptionResponse as HttpExceptionResponse;
        message = httpResponse.message || exceptionResponse;
        error = httpResponse.error || exception.name;
      }
    }
    // Handle TypeORM database errors
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      const dbError = exception as unknown as PostgresError;

      // PostgreSQL duplicate key error (unique constraint violation)
      if (dbError.code === '23505') {
        status = HttpStatus.CONFLICT;
        error = 'Conflict';
        message = this.extractDuplicateKeyMessage(dbError);
      }
      // PostgreSQL foreign key violation
      else if (dbError.code === '23503') {
        status = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
        message = 'Foreign key constraint violation';
      }
      // Other database errors
      else {
        message = 'Database error occurred';
      }

      this.logger.error(`Database error: ${dbError.message}`, dbError.stack);
    }
    // Handle unexpected errors
    else if (exception instanceof Error) {
      this.logger.error(
        `Unexpected error: ${exception.message}`,
        exception.stack,
      );
      message = 'An unexpected error occurred';
      error = exception.name;
    }

    // Log error details
    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - ${JSON.stringify(message)}`,
    );

    // Send error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    });
  }

  /**
   * Extract user-friendly message from PostgreSQL duplicate key error
   */
  private extractDuplicateKeyMessage(error: PostgresError): string {
    const detail = error.detail || '';

    // Extract field name from error detail
    if (detail.includes('isbn')) {
      return 'A book with this ISBN already exists';
    }

    return 'Duplicate entry found';
  }
}
