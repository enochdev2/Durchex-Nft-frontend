async function onChange(e) {
  const file = e.target.files[0];
  uploadToIPFS(file);
  // try {
  //   const added = await client.add(
  //     file,
  //     {
  //       progress: (prog) => console.log(`received: ${prog}`)
  //     }
  //   )
  //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //   setFileUrl(url)
  // } catch (error) {
  //   console.log('Error uploading file: ', error)
  // }
}

async function createMarket() {
  const { name, description, price } = formInput;
  if (!name || !description || !price || !fileUrl) return;
  /* first, upload to IPFS */
  const data = JSON.stringify({
    name,
    description,
    image: fileUrl,
  });
  try {
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    createSale(url);
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}

async function createSale(url) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  /* next, create the item */
  let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
  let transaction = await contract.createToken(url);
  let tx = await transaction.wait();
  let event = tx.events[0];
  let value = event.args[2];
  let tokenId = value.toNumber();

  const price = ethers.utils.parseUnits(formInput.price, "ether");

  /* then list the item for sale on the marketplace */
  contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
  router.push("/");
}



getListingFee()
listNFT()
buyNFT()
getActiveListings()
getAllListings()
getMyNFTs()
getNFTById()
updatePoints()
isEligibleForAirdrop()
setPointsPerTransaction()
setPointThreshold()


//* NFT CONTRACT FUNCTIONS

vendorMint()
publicMint()
addVendor()
removeVendor()
withdraw()
setMintingFee()
isAuthorizedVendor()
getAllVendors()
getNFTById()
tokenURI()