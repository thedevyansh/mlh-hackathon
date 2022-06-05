import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConnectSolanaWallet from '../../components/ConnectSolanaWallet';
// import CreateSolanaAccount from '../../components/CreateSolanaAccount';
// import ShowSolanaMusicList from '../../components/ShowSolanaMusicList';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Solana Music - Acoustic Licious</title>
      </Helmet>
      <ConnectSolanaWallet />
      {/* <CreateSolanaAccount /> */}
      {/* <ShowSolanaMusicList /> */}
    </>
  );
}
