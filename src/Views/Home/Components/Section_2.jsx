import React, { useState, useEffect } from "react";

import { ProductNFT } from "../../../components/UiComponents/ProductNFT";
// import { fetchAllNFTs } from "../../../apis/FetchNFTs";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Product404 from "../../../components/UiComponents/Product404";

import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchAllNFTs } from "../../../hooks/ContractControllers/useFetchAllNFTs";
import { fetchMetadataFromPinata, getActiveListings, tokenURI } from "../../../hooks/ContractControllers/useMintNFT";

function Section_2() {
  const [TradingNFTs, setTradingNFTs] = useState([]);
  console.log("🚀 ~ Section_2 ~ TradingNFTs:", TradingNFTs.length);

  useEffect(() => {
    const fetching = async () => {
        try {
          const response = await getActiveListings();
          console.log("🚀 ~ .then ~ response:", response);
      
          // Create an empty array to store formatted items
          const formattedListings = [];
      
          // Iterate over each item in the response
          for (const item of response) {
            const formattedItem = {
              itemId: item.itemId.toString(),
              nftContract: item.nftContract,
              tokenId: item.tokenId.toString(),
              owner: item.owner,
              seller: item.seller,
              price: item.price.toString(),
              currentlyListed: item.currentlyListed,
            };
      
            // Fetch the tokenURI and metadata using the tokenId
            // const tokenURI = await nftContract.methods.tokenURI(formattedItem.tokenId).call();
            const url = await tokenURI(formattedItem.tokenId)
            
            // Fetch metadata from the tokenURI
            const parsedFile = await fetchMetadataFromPinata(url);
            const metadata = JSON.parse(parsedFile.file);
            
      
            // Add each field of metadata to the formatted item
            formattedItem.name = metadata.name;
            formattedItem.description = metadata.description;
            formattedItem.image = metadata.image; // assuming the metadata has an `image` field
            formattedItem.category = metadata.catogory; // add other fields as needed
            formattedItem.properties = metadata.properties; // add other fields as needed
            formattedItem.royalties = metadata.royalties; // add other fields as needed
            // formattedItem.creator = metadata.creator; // add other fields as needed
      
            // Push the formatted item into the array
            formattedListings.push(formattedItem);
          }
      
          // Now set the state with the entire array of listings
          setTradingNFTs(formattedListings);
        } catch (error) {
          console.error("Error fetching active listings or metadata:", error);
        }
      }
                  
      // await getActiveListings()
      //   .then((response) => {
      //     console.log("🚀 ~ .then ~ response:", response);
      //     // Iterate over each item in the response
      //     response.forEach((item) => {
      //       const formattedItem = {
      //         itemId: item.itemId.toString(), // Convert BigInt to string
      //         nftContract: item.nftContract,
      //         tokenId: item.tokenId.toString(), // Convert BigInt to string
      //         owner: item.owner,
      //         seller: item.seller,
      //         price: item.price.toString(), // Convert BigInt to string
      //         currentlyListed: item.currentlyListed,
      //       };

      //       setTradingNFTs(formattedItem);
      //     });

      //     // setTradingNFTs(response)
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     ErrorToast(<div>Something error happen try agin 💔 !</div>);
      //   });

      // try {
      // } catch (error) {
      //   console.log(error);
      // }

    fetching();
  }, []);

  return (
    <div
      id="section-2"
      className="flex flex-col gap-5 mt-14 lg:mt-14 justify-center"
    >
      <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
        <h1 className="dark:text-white/80 text-2xl font-semibold sm:text-3xl">
          Trending{" "}
          <b className="border-2 sm:text-2xl text-lg font-semibold text-white lg:shadow-none lg:shadow-purple-800/80 sm:border-0 rounded-md shadow-lg shadow-purple-800/80 p-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500">
            NFTs
          </b>
        </h1>
      </div>
      {TradingNFTs?.length > 0 ? (
        //  TradingNFTs.length > 0 ? (

        <div className="w-full mt-1 sm:mt-20 flex justify-center gap-10 sm:justify-start flex-wrap">
          {console.log("working")}

          <Swiper
            slidesPerView={3}
            centeredSlides={false}
            breakpoints={{
              200: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: false,
              },
              450: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1500: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            spaceBetween={60}
            grabCursor={true}
            modules={[Autoplay]}
            className="h-[29pc]"
          >
            {TradingNFTs?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!flex  justify-center items-center w-full"
              >
                <ProductNFT
                  className="w-full !h-[30pc] xl:!h-[25pc]"
                  link="/nft/"
                  button="Buy"
                  data={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // ) : (
        //   <div className="h-[40dvh] justify-center items-center flex">
        //     <Product404
        //       message="There is not trending NFTs"
        //       subMessage="Explore the NFTs"
        //     />
        //   </div>
        // )
        <div className="h-[40dvh] justify-center items-center flex">
          <Product404
            message="There is not trending NFTs"
            subMessage="Explore the NFTs"
          />
        </div>
      )}
    </div>
  );
}

export default Section_2;
