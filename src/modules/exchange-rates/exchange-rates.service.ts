import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  ExchangeRateApiResponse,
  ExchangeRateData,
  IExchangeRatesService,
} from './interfaces';

/**
 * Service to fetch and cache exchange rates from external API
 * Implements caching strategy to avoid excessive API calls
 */
@Injectable()
export class ExchangeRatesService implements IExchangeRatesService {
  private readonly logger = new Logger(ExchangeRatesService.name);
  private readonly API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
  private readonly CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

  private cachedData: ExchangeRateData | null = null;
  private lastFetchTime: Date | null = null;

  /**
   * Fallback exchange rates in case external API is unavailable
   */
  private readonly FALLBACK_RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    ARS: 1000.0, // Argentine Peso
    MXN: 20.0, // Mexican Peso
    BRL: 5.3, // Brazilian Real
    CLP: 900.0, // Chilean Peso
    COP: 4000.0, // Colombian Peso
  };

  /**
   * Get exchange rate for specific currency
   */
  async getExchangeRate(targetCurrency: string): Promise<number> {
    const upperCurrency = targetCurrency.toUpperCase();

    try {
      // Try to get fresh data from API
      if (!this.isCacheFresh()) {
        await this.fetchRates();
      }

      // Return from cache if available
      if (this.cachedData && this.cachedData.rates[upperCurrency]) {
        return this.cachedData.rates[upperCurrency];
      }

      // Fallback to hardcoded rates
      if (this.FALLBACK_RATES[upperCurrency]) {
        this.logger.warn(
          `Using fallback rate for ${upperCurrency}. External API may be unavailable.`,
        );
        return this.FALLBACK_RATES[upperCurrency];
      }

      throw new ServiceUnavailableException(
        `Exchange rate for ${upperCurrency} is not available`,
      );
    } catch (error) {
      this.logger.error(
        `Error fetching exchange rate for ${upperCurrency}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      // Try fallback
      if (this.FALLBACK_RATES[upperCurrency]) {
        this.logger.warn(`Using fallback rate for ${upperCurrency}`);
        return this.FALLBACK_RATES[upperCurrency];
      }

      throw new ServiceUnavailableException(
        'Exchange rate service is temporarily unavailable',
      );
    }
  }

  /**
   * Get all current exchange rates
   */
  async getAllRates(): Promise<ExchangeRateData> {
    if (!this.isCacheFresh()) {
      await this.fetchRates();
    }

    if (!this.cachedData) {
      throw new ServiceUnavailableException(
        'Exchange rate data is not available',
      );
    }

    return this.cachedData;
  }

  /**
   * Check if cached data is still fresh
   */
  isCacheFresh(): boolean {
    if (!this.cachedData || !this.lastFetchTime) {
      return false;
    }

    const now = new Date();
    const timeDiff = now.getTime() - this.lastFetchTime.getTime();

    return timeDiff < this.CACHE_DURATION_MS;
  }

  /**
   * Fetch rates from external API
   */
  private async fetchRates(): Promise<void> {
    try {
      this.logger.log('Fetching exchange rates from external API...');

      const response = await fetch(this.API_URL);

      if (!response.ok) {
        throw new Error(
          `API responded with status ${response.status}: ${response.statusText}`,
        );
      }

      const data = (await response.json()) as ExchangeRateApiResponse;

      this.cachedData = {
        base: data.base,
        date: data.date,
        rates: data.rates,
        lastUpdated: new Date(),
      };

      this.lastFetchTime = new Date();

      this.logger.log(
        `Successfully fetched exchange rates. Base: ${data.base}, Date: ${data.date}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to fetch exchange rates: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      // If we have old cache, keep using it
      if (this.cachedData) {
        this.logger.warn('Using stale cache due to API failure');
      } else {
        throw new ServiceUnavailableException(
          'Unable to fetch exchange rates and no cache available',
        );
      }
    }
  }
}
