const anchor = require('@project-serum/anchor');
const Program = anchor.Program;
const web3 = require('@solana/web3.js');
const PublicKey = web3.PublicKey
const chai = require('chai')
const expect = chai.expect
const mocha = require('mocha')
const describe = mocha.describe


const s = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Testproj;


  const [userStatsPDA, _] = await PublicKey
    .findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("playerdetails")),
        provider.wallet.publicKey.toBuffer()
      ],
      program.programId
    );
  console.log(userStatsPDA);

  // THIS IS HOW YOU BEGIN THE GAME
  await program.methods
    .start("brian")
    .accounts({
      user: provider.wallet.publicKey,
      playerDetails: userStatsPDA,
    })
    .rpc();
  let k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);

  // THIS IS HOW YOU CHANGE THE NAME
  await program.methods.changePlayerName("rudranhs").accounts({
    user: provider.wallet.publicKey,
    userStats: userStatsPDA
  }).rpc();
  k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);

  // THIS IS HOW TO UPDATE THE GAME SCORE FOR EACH GAME
  await program.methods.changeGameScore("2048", "10").accounts({
    user: provider.wallet.publicKey,
    userStats: userStatsPDA
  }).rpc();
  k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);

  await program.methods.changeGameScore("Puzzle", "20").accounts({
    user: provider.wallet.publicKey,
    userStats: userStatsPDA
  }).rpc();
  k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);

  // THIS IS HOW TO UPDATE THE GAMES PLAYED OF EACH GAME
  await program.methods.changeCountGamesPlayed("Puzzle").accounts({
    user: provider.wallet.publicKey,
    userStats: userStatsPDA
  }).rpc();
  k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);

  await program.methods.changeCountGamesPlayed("2048").accounts({
    user: provider.wallet.publicKey,
    userStats: userStatsPDA
  }).rpc();
  k = await (program.account.playerDetails.fetch(userStatsPDA))
  console.log(k.playerName, k);
  // expect(().to.equal("brian");

  // await program.methods
  //   .changeUserName("tom")
  //   .accounts({
  //     user: provider.wallet.publicKey,
  //     userStats: userStatsPDA
  //   })
  //   .rpc();

  // const y = await program.account.userStats.fetch(userStatsPDA)
  // console.log(y.name, y);
  // // expect((await program.account.userStats.fetch(userStatsPDA)).name).to.equal("tom");

}
s();

