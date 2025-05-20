// require("@matterlabs/hardhat-zksync-solc");
// require("@matterlabs/hardhat-zksync-verify");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // zksolc: {
  //   version: "1.4.1",
  //   compilerSource: "binary",
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //     },
  //   },
  // },
  // networks: {
  //   zkSyncSepoliaTestnet: {
  //     url: "https://sepolia.era.zksync.dev",
  //     ethNetwork: "sepolia",
  //     zksync: true,
  //     chainId: 300,
  //     verifyURL:
  //       "https://explorer.sepolia.era.zksync.dev/contract_verification",
  //   },
  //   zkSyncMainnet: {
  //     url: "https://mainnet.era.zksync.io",
  //     ethNetwork: "mainnet",
  //     zksync: true,
  //     chainId: 324,
  //     verifyURL:
  //       "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
  //   },
  // },
  // paths: {
  //   artifacts: "./artifacts-zk",
  //   cache: "./cache-zk",
  //   sources: "./contracts",
  //   tests: "./test",
  // },
  solidity: {
    version: "0.8.23",
    defaultNetwork: "sepolia",
    networks: {
      hadhat: {},
      sepolia: {
        url: "https://rpc.ankr.com/eth_sepolia",
        // url: "https://rpc.ankr.com/eth_sepolia/4388dee78967b6b115466ca6c71983a452261a4e881b82877ed836a2959c7309",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
