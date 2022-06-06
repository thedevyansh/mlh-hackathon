import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import ConnectSolanaWallet from '../../components/ConnectSolanaWallet';
import ShowSolanaMusicList from '../../components/ShowSolanaMusicList';

export default function SolanaMusic() {
  const [walletAddress, setWalletAddress] = useState(null);
  const toast = useToast();

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        toast({
          title: 'Phantom wallet not found.',
          description: 'Please install the wallet from https://phantom.app.',
          status: 'error',
          position: 'top',
          duration: 5000,
        });
      }
    } catch (error) {
      console.log('ERROR in [checkIfWalletIsConnected] : ', error);
    }
  }, [toast]);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [checkIfWalletIsConnected]);

  return (
    <>
      <Helmet>
        <title>Solana Music - Acoustic Licious</title>
      </Helmet>
      {!walletAddress && (
        <ConnectSolanaWallet setWalletAddress={setWalletAddress} />
      )}
      {walletAddress && <ShowSolanaMusicList walletAddress={walletAddress} />}
    </>
  );
}
