// import ContractInstance, { MarketContractInstance } from "../useContract";

// const fetchAllNFTs = async () => {
//   var AllNFTsData = [];
//   try {
//     // const AllNumberOfNFTs = await ContractInstance.methods.totalSupply().call();
//     const AllNumberOfNFTs = await MarketContractInstance.methods.getActiveListings().call();
//     // for (let i = 0; i < AllNumberOfNFTs; i++) {
//     //   const response = await ContractInstance.methods.getNFTById(i).call();
//     //   AllNFTsData.push({
//     //     NFTid: i,
//     //     Price: response.price,
//     //     Owner: response.owner,
//     //     Creator:response.creator,
//     //     Uri: response.uri,
//     //     // uint itemId;
//     //     // address nftContract; 
//     //     // uint256 tokenId;
//     //     // address payable owner;
//     //     // address payable seller;
//     //     // uint256 price;
//     //     // bool currentlyListed;
//     //   });
//     // }
//     return AllNumberOfNFTs
//   } catch (error) {
//     console.log(error);
//   }
//   return AllNFTsData;
// };
// // const Vendors = async () => {
// //   var AllNFTsData = [];
// //   try {
// //     // const AllNumberOfNFTs = await ContractInstance.methods.totalSupply().call();
// //     const AllVendor = await ContractInstance.methods.getAllVendors().call();
// //     AllNumberOfNFTs.push(AllVendor)
// //     return AllVendor;

// //     // for (let i = 0; i < AllNumberOfNFTs; i++) {
// //     //   const response = await ContractInstance.methods.getNFTById(i).call();
// //     //   AllNFTsData.push({
// //     //     NFTid: i,
// //     //     Price: response.price,
// //     //     Owner: response.owner,
// //     //     Creator:response.creator,
// //     //     Uri: response.uri,
// //     //   });
// //     // }
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// export { fetchAllNFTs};
