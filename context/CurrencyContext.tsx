'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'AED' | 'GBP';

interface CurrencyRate {
  symbol: string;
  rateFromINR: number; // multiplier to convert INR to this currency
  decimals: number;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyRate> = {
  INR: { symbol: '₹', rateFromINR: 1, decimals: 0 },
  USD: { symbol: '$', rateFromINR: 1 / 84.5, decimals: 0 },
  EUR: { symbol: '€', rateFromINR: 1 / 91.0, decimals: 0 },
  AED: { symbol: 'AED ', rateFromINR: 1 / 23.0, decimals: 0 },
  GBP: { symbol: '£', rateFromINR: 1 / 107.0, decimals: 0 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInInr: number) => string;
  convertPrice: (amountInInr: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR',
  setCurrency: () => {},
  formatPrice: (amt) => `₹${amt.toLocaleString('en-IN')}`,
  convertPrice: (amt) => amt,
  symbol: '₹',
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('travelopedia_currency') as CurrencyCode;
      if (saved && CURRENCY_CONFIG[saved]) {
        setCurrencyState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('travelopedia_currency', code);
    } catch {
      // ignore
    }
  };

  const convertPrice = (amountInInr: number): number => {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;
    return Math.round(amountInInr * config.rateFromINR);
  };

  const formatPrice = (amountInInr: number): string => {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;
    const converted = convertPrice(amountInInr);
    if (currency === 'INR') {
      return `₹${amountInInr.toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        symbol: CURRENCY_CONFIG[currency]?.symbol || '₹',
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
