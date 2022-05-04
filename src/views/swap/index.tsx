// Next, React
import { FC, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';


// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { Button, Grid, makeStyles } from "@material-ui/core";

import {
    Signer,
    ConfirmOptions,
    Connection,
    Transaction,
    TransactionSignature,
    PublicKey,
  } from "@solana/web3.js";
  import {
    TokenListContainer,
    TokenListProvider,
  } from "@solana/spl-token-registry";
  import Swap from "@project-serum/swap-ui";
  import { AnchorProvider } from "@project-serum/anchor";

export const SwapView: FC = ({ }) => {
  const [tokenList, setTokenList] = useState<TokenListContainer | null>(null);
  const wallet = useWallet()
  const network = "https://solana-api.projectserum.com";
  const opts: ConfirmOptions = {
    preflightCommitment: "recent",
    commitment: "recent",
  };
  const connection = new Connection(network, opts.preflightCommitment);
  
  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
    }
  }, [wallet.publicKey, connection])

  useEffect(() => {
    new TokenListProvider().resolve().then(setTokenList);
  }, [setTokenList]);



  const provider = new AnchorProvider(connection, wallet, opts)
  
  return (
<div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          SWAP
        </h1>
        {wallet.publicKey? <Swap provider={provider} tokenList={tokenList} /> : ''}
        <div className="text-center">
        </div>
      </div>
    </div>
  );
};
