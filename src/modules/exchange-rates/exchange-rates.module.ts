import { Module } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';

/**
 * Module for managing external exchange rate API integration
 */
@Module({
  providers: [
    {
      provide: 'IExchangeRatesService',
      useClass: ExchangeRatesService,
    },
  ],
  exports: ['IExchangeRatesService'],
})
export class ExchangeRatesModule {}
