/**
 * External API response from exchangerate-api.com
 */
export interface ExchangeRateApiResponse {
  provider: string;
  WARNING_UPGRADE_TO_V6?: string;
  terms: string;
  base: string;
  date: string;
  time_last_updated: number;
  rates: Record<string, number>;
}

/**
 * Internal exchange rate data
 */
export interface ExchangeRateData {
  base: string;
  date: string;
  rates: Record<string, number>;
  lastUpdated: Date;
}
