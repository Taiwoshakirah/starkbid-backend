import { Provider, RpcProvider } from 'starknet';
import NodeCache from 'node-cache';
import { formatTransaction } from '../utils/formatTransaction';
import { FormattedTransaction, RawEvent } from '../types/Transaction';

// // setup provider and cache

const provider = new RpcProvider({
  nodeUrl: `https://starknet-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
});

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export const getTransactionHistory = async (
  walletAddress: string,
): Promise<FormattedTransaction[]> => {
  const cacheKey = `txs_${walletAddress}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as FormattedTransaction[];
  }
  
  try {
    const eventsChunk = await provider.getEvents({
      address: walletAddress,
      chunk_size: 50,
      from_block: { block_number: 0 }, // start from block 0
      keys: [], // no event filter
    });
    
    // const eventsChunk = await provider.getEvents({
    //   address: walletAddress,
    //   chunk_size: 50,
    // });
    
    // Fix: Use the correct type for the events from the provider
    const events = Array.isArray(eventsChunk.events) ? eventsChunk.events : [];
    
    // Use a type assertion to convert from the provider's event type to your RawEvent type
    const formatted = events.map((event) => {
      // Convert the provider's event type to your RawEvent type
      return formatTransaction(event as unknown as RawEvent);
    });
    
    cache.set(cacheKey, formatted);
    return formatted;
  } catch (err) {
    console.error('Failed to fetch events', err);
    throw new Error('Could not retrieve transaction data');
  }
};

// export const getTransactionHistory = async (wallet: string) => {
//   // Mock data
//   return [
//     {
//       id: "tx1",
//       wallet,
//       type: "deposit",
//       amount: 100,
//       currency: "USD",
//       date: "2024-10-05T10:00:00Z",
//     },
//     {
//       id: "tx2",
//       wallet,
//       type: "withdrawal",
//       amount: 50,
//       currency: "USD",
//       date: "2024-10-06T15:30:00Z",
//     },
//   ];
// };
