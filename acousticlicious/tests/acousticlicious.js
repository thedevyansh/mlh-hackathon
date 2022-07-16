const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log('Starting test...');

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Acousticlicious;
  const baseAccount = anchor.web3.Keypair.generate();
  let tx = await program.rpc.initializeBaseAccount({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log('Your transaction signature', tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Music Count', account.totalMusic.toString());

  // You'll need to now pass a GIF link to the function! You'll also need to pass in the user submitting the GIF!
  await program.rpc.addMusic(
    'DK_UsATwoxI',
    'https://i.ytimg.com/vi/2Vv-BfVoq4g/default.jpg',
    'Ed Sheeran - Perfect (Official Music Video)',
    "Ed Sheeran",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Music Count', account.totalMusic.toString());

  // Access gif_list on the account!
  console.log('👀 Music List', account.musicList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
