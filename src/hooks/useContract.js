import Web3 from "web3";
import marketAbi from "../contracts/NFTMarketplace.json";
import vendorAbi from "../contracts/VendorNFT.json";


export const web3 = new Web3(
  window.ethereum || process.env.REACT_APP_WEB3_PROVIDER
);

export const ContractAddress = process.env.REACT_APP_NFTMARKETPLACE_CONTRACT_ADDRESS;
export const VendorContractAddress =
  process.env.REACT_APP_VENDORNFT_CONTRACT_ADDRESS;

const ContractInstance = new web3.eth.Contract(
  vendorAbi.abi,
  VendorContractAddress
);
export const MarketContractInstance = new web3.eth.Contract(
  marketAbi.abi,
  ContractAddress
);

export default ContractInstance;
