import { ExchangeRateData } from './exchange-rate-response.interface';

/**
 * Interface for ExchangeRates service
 */
export interface IExchangeRatesService {
  /**
   * Get exchange rate from USD to target currency
   * @param targetCurrency Currency code (e.g., 'EUR', 'ARS', 'MXN')
   * @returns Exchange rate or throws ServiceUnavailableException
   */
  getExchangeRate(targetCurrency: string): Promise<number>;

  /**
   * Get all current exchange rates
   * @returns Complete exchange rate data
   */
  getAllRates(): Promise<ExchangeRateData>;

  /**
   * Check if cache is fresh (less than 1 hour old)
   * @returns true if cache is valid
   */
  isCacheFresh(): boolean;
}
