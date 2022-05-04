import type { NextPage } from "next";
import Head from "next/head";
import { SwapView } from "../views";

const Swap: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Swap"
        />
      </Head>
      <SwapView />
    </div>
  );
};

export default Swap;
