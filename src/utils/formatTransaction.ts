// utils/formatTransaction.ts
import { RawEvent, FormattedTransaction } from '../types/Transaction';

export const formatTransaction = (event: RawEvent): FormattedTransaction => {
  const {
    from_address,
    to_address,
    amount = '0',
    block_number,
    transaction_hash,
    timestamp,
  } = event;

  return {
    txHash: transaction_hash,
    type: determineTransactionType(from_address, to_address),
    from: from_address,
    to: to_address,
    amount: formatCryptoValue(amount),
    block: block_number,
    time: new Date(timestamp * 1000).toLocaleString(),
  };
};

const determineTransactionType = (
  from?: string,
  to?: string,
): FormattedTransaction['type'] => {
  if (!from) return 'Mint';
  if (!to) return 'Burn';
  return 'Transfer';
};

const formatCryptoValue = (rawValue: string, decimals = 18): string => {
  return (Number(rawValue) / 10 ** decimals).toFixed(6);
};
