// types/Transaction.ts
export interface RawEvent {
    from_address?: string;
    to_address?: string;
    amount?: string;
    block_number: number;
    transaction_hash: string;
    timestamp: number;
  }
  
  export interface FormattedTransaction {
    txHash: string;
    type: "Transfer" | "Mint" | "Burn";
    from?: string;
    to?: string;
    amount: string;
    block: number;
    time: string;
  }
  