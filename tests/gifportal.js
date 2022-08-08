const anchor = require('@project-serum/anchor')

const main = async()=>{
  console.log('Staring tests...')
  //Run locally
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)


  const program = anchor.workspace.Gifportal

  //baseaccount reference w/ new keypair
  const baseAccount = anchor.web3.Keypair.generate()


  const tx = await program.rpc.startStuffOff({
    accounts:{
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    },
    signers: [baseAccount]
  })
  console.log('Tx sig:',tx)

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('Gif count', account.totalGifs.toString())

  await program.rpc.addGif("https://media.giphy.com/media/Wm92G9u3KisHcdo3yl/giphy.gif,",
  {
    accounts:{
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    }
  })

  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('Gif list', account.gifList)
}

const runMain = async()=>{
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
runMain()