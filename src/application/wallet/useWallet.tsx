import { PublicKeyish, Token, TokenAmount } from '@raydium-io/raydium-sdk';
import { Adapter, WalletName } from '@solana/wallet-adapter-base';
import { Wallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import BN from 'bn.js';
import create from 'zustand';

import { isToken } from '../../functions/judgers/dateType';
import { gte } from '../../functions/numberish/compare';
import { HexAddress } from '@/types/constants';

import { isQuantumSOL, QuantumSOLAmount, WSOLMint } from '../token/utils/quantumSOL';

import { TokenAccountRawInfo, ITokenAccount } from './type';

export type WalletStore = {
  // owner
  owner: PublicKey | undefined;
  /** old version of currentWallet */
  adapter?: Adapter;

  // a experimental feature (owner isn't in shadowOwners)
  /** each Keypair object hold both publicKey and secret key */
  shadowKeypairs?: Keypair[];
  availableWallets: Wallet[];
  currentWallet?: Wallet | null;
  connected: boolean;
  disconnecting: boolean;
  connecting: boolean;
  select(walletName: WalletName): void;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>; // if not connected, return empty array
  disconnect(): Promise<unknown>;

  tokenAccounts: ITokenAccount[];
  /** pass to SDK */
  tokenAccountRawInfos: TokenAccountRawInfo[];
  getBalance(target: Token | PublicKeyish | undefined): TokenAmount | QuantumSOLAmount | undefined;
  checkWalletHasEnoughBalance(minBalance: TokenAmount | undefined): boolean;
  pureBalances: Record<HexAddress, TokenAmount>;
  balances: Record<HexAddress, TokenAmount>;
  refreshCount: number;
  rawBalances: Record<HexAddress, BN>;
};

const useWallet = create<WalletStore>((set, get) => ({
  // owner
  owner: undefined,
  availableWallets: [],
  connected: false,
  disconnecting: false,
  connecting: false,
  select: () => {},
  signAllTransactions: () => Promise.resolve([]),
  disconnect: () => Promise.resolve(),
  /** only for Dev */
  inSimulateMode: false,

  tokenAccounts: [],
  tokenAccountRawInfos: [],
  pureBalances: {},
  balances: {},
  rawBalances: {},
  getBalance(target) {
    if (!target) return undefined;
    if (isQuantumSOL(target) && target.collapseTo === 'wsol') {
      return get().pureBalances[String(WSOLMint)];
    } else {
      const mint = isToken(target) ? String(target.mint) : String(target);
      return get().balances[mint];
    }
  },
  checkWalletHasEnoughBalance(minBalance) {
    if (!minBalance) return false;
    const userBalance = get().getBalance(minBalance.token);
    if (!userBalance) return false;
    return gte(userBalance, minBalance);
  },
  refreshCount: 0,
}));

export default useWallet;
