import Web3 from "web3";
import { WarringToast } from "../../app/Toast/Warring";
import ContractInstance, { MarketContractInstance } from "../useContract";
import { web3 } from "../useContract";
import { ethereumUsd } from "../useEtherUsdPrice";
import { ethers } from "ethers";
import BN from "bn.js";
import { BigNumber } from "ethers";

const MintNFT = async (_account, _price, _uri, _creatorFee, _approveNft) => {
  const ether = Number(_price / (await ethereumUsd())).toFixed(18);
  const _wei = web3.utils.toWei(ether, "ether");
  try {
    const response = await ContractInstance.methods
      .mintNFT(_uri, _creatorFee, _wei, _approveNft)
      .send({
        from: _account,
      });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT ( Hook )");
    return error;
  }
};

//* VendorNFT  Functions

const getAllVendors = async () => {
  try {
    const response = await ContractInstance.methods.getAllVendors().call();
    console.log("🚀 ~ getAllVendors ~ response:", response);
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const addVendor = async (_account, VendorAddress) => {
  try {
    const response = await ContractInstance.methods
      .addVendor(VendorAddress)
      .send({
        from: _account,
        gas: 30000000,
      });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const vendorMint = async (_account, _uri, nftMarketplaceAddress) => {
  // const ether = Number(_price / (await ethereumUsd())).toFixed(18);
  // const _wei = web3.utils.toWei(ether, "ether");
  try {
    const response = await ContractInstance.methods
      .vendorMint(_uri, nftMarketplaceAddress)
      .send({
        from: _account,
      });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const publicMint = async (_account, _uri, nftMarketplaceAddress) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", ContractInstance);

    const response = await ContractInstance.methods
      .publicMint(_uri, nftMarketplaceAddress)
      .send({
        from: _account,
        value: web3.utils.toWei("0.01", "ether"), // Convert 0.01 ether to wei
      });

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const removeVendor = async (_account, VendorAddress) => {
  try {
    const response = await ContractInstance.methods
      .removeVendor(VendorAddress)
      .send({
        from: _account,
      });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const withdraw = async (_account) => {
  try {
    const response = await ContractInstance.methods.withdraw().send({
      from: _account,
    });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const setMintingFee = async (_account, newFee) => {
  try {
    const response = await ContractInstance.methods.setMintingFee(newFee).send({
      from: _account,
    });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const isAuthorizedVendor = async (address) => {
  try {
    const response = await ContractInstance.methods
      .isAuthorizedVendor(address)
      .call();
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const getNFTById_ = async () => {
  try {
    const response = await ContractInstance.methods.getNFTById().call();
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};
const nftOwned = async (address) => {
  try {
    const response = await ContractInstance.methods.ownerOf(address).call();
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

const tokenURI = async (tokenId) => {
  try {
    const response = await ContractInstance.methods.tokenURI(tokenId).call();
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in addVendor ( Hook )");
    return error;
  }
};

//*  WRITE FUNCTIONS for MarketPlace
const listNFT = async (_account, tokenIds, prices, nftContractAddress) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    // const tokenId = new BigNumber(tokenIds);
    const tokenId = BigNumber.from("1"); // Use BigNumber for tokenId
    const tokenID = parseInt("1"); // Use BigNumber for tokenId
    console.log("🚀 ~ listNFT ~ tokenId:", tokenId);
    // const amount = BigNumber.from(price);      // Use BigNumber for price
    // let tokenId = tokenIds.toNumber();
    const price = ethers.utils.parseUnits("15", "ether");
    const uint256Value = ethers.BigNumber.from(price);
    console.log("🚀 ~ listNFT ~ uint256Value:", uint256Value);

    const response = await MarketContractInstance.methods
      // .listNFT(nftContractAddress, tokenId.toString(), price.toString())
      .listNFT(nftContractAddress, "2", "15")
      .send({
        from: _account,
        value: web3.utils.toWei("0.01", "ether"), // Convert 0.01 ether to wei
        gas: 2000000,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction Hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction Receipt:", receipt);
      })
      .on("error", (error) => {
        console.error("Transaction Error:", error);
      });

    // const response = await ContractInstance.methods
    //   .publicMint(_uri, nftMarketplaceAddress)
    //   .send({
    //     from: _account,
    //     value: web3.utils.toWei("0.01", "ether"), // Convert 0.01 ether to wei
    //   });

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const buyNFT = async (_account, nftContractAddress, itemIds, price) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    let itemId = itemIds.toNumber();

    const response = await MarketContractInstance.methods
      .buyNFT(nftContractAddress, itemId)
      .send({
        from: _account,
        value: web3.utils.toWei(price.toString(), "ether"), // Convert 0.01 ether to wei
        gas: 50000000,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction Hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction Receipt:", receipt);
      })
      .on("error", (error) => {
        console.error("Transaction Error:", error);
      });
    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const setPointThreshold = async (_account, Threshold) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    let threshold = Threshold.toNumber();

    const response = await MarketContractInstance.methods
      .listNFT(threshold)
      .send({
        from: _account,
        gas: 50000000,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction Hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction Receipt:", receipt);
      })
      .on("error", (error) => {
        console.error("Transaction Error:", error);
      });

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

//?  READ FUNCTIONS

const getListingFee = async () => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    const response = await MarketContractInstance.methods
      .getListingFee()
      .call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const getActiveListings = async () => {
  try {

    const response = await MarketContractInstance.methods.getActiveListings().call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const getAllListings = async () => {
  try {

    const response = await MarketContractInstance.methods
      .getAllListings()
      .call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const getMyNFTs = async () => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    const response = await MarketContractInstance.methods.getMyNFTs().call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const getNFTById = async (itemIds) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    let itemId = itemIds.toNumber();

    const response = await MarketContractInstance.methods
      .getNFTById(itemId)
      .call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};

const setPointsPerTransaction = async (newPoint) => {
  try {
    console.log("🚀 ~ publicMint ~ ContractInstance:", nftContractAddress);

    let point = newPoint.toNumber();

    const response = await MarketContractInstance.methods
      .setPointsPerTransaction(point)
      .call();

    WarringToast("Waiting for transaction ....");
    return response;
  } catch (error) {
    console.log(error + " in useMintNFT in VendorNFT ( Hook )");
    return error;
  }
};




// Helper function to fetch metadata from Pinata using the tokenURI
async function fetchMetadataFromPinata(tokenUrl) {
  try {
    const response = await fetch(tokenUrl); // tokenURI points to metadata hosted on IPFS
    const metadata = await response.json();
    console.log("🚀 ~ fetchMetadataFromPinata ~ metadata:", metadata)
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata from Pinata:", error);
    return {}; // return an empty object if there's an error
  }
}

export {
  MintNFT,
  addVendor,
  vendorMint,
  publicMint,
  listNFT,
  getActiveListings,
  getAllListings,
  getMyNFTs,
  getNFTById,
  setPointThreshold,
  setPointsPerTransaction,
  buyNFT,
  getListingFee,
  getAllVendors,
  removeVendor,
  withdraw,
  setMintingFee,
  getNFTById_,
  nftOwned,
  tokenURI,
  isAuthorizedVendor,
  fetchMetadataFromPinata,
};
