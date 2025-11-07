/**
 * Exchange Rates Service Configuration Constants
 */

/**
 * External API URL for exchange rates
 */
export const EXCHANGE_RATE_API_URL =
  'https://api.exchangerate-api.com/v4/latest/USD';

/**
 * Cache duration in milliseconds (1 hour)
 */
export const CACHE_DURATION_MS = 60 * 60 * 1000;

/**
 * Fallback exchange rates to use when external API is unavailable
 * These rates should be updated periodically
 */
export const FALLBACK_EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  ARS: 1000.0, // Argentine Peso
  MXN: 20.0, // Mexican Peso
  BRL: 5.3, // Brazilian Real
  CLP: 900.0, // Chilean Peso
  COP: 4000.0, // Colombian Peso
} as const;
