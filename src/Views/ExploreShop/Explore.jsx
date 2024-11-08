import React, { useState, useEffect } from "react";
import { MdRestartAlt } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import ShopNFTs from "./Components/ShopNFTs";
import ShopCollections from "./Components/ShopCollections";

function Explore() {
  const URLpath = useLocation();
  const [categories] = useState({
    all: "all",
    sports: "sports",
    music: "music",
    art: "art",
    Photography: "Photography",
    utility: "utility",
    gaming: "gaming",
  });

  const [TradingNFTs, setTradingNFTs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories.all); // State for selected category

  // Dummy data for filtering options
  const categoryOptions = Object.values(categories);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await getActiveListings();

        const formattedListings = response.map(item => {
          return {
            itemId: item.itemId.toString(),
            nftContract: item.nftContract,
            tokenId: item.tokenId.toString(),
            owner: item.owner,
            seller: item.seller,
            price: item.price.toString(),
            currentlyListed: item.currentlyListed,
            category: item.metadata.category || "all", // assuming category is in metadata
          };
        });

        setTradingNFTs(formattedListings);
      } catch (error) {
        console.error("Error fetching active listings:", error);
      }
    };

    fetching();
  }, []);

  // Filter TradingNFTs based on selectedCategory
  const filteredNFTs = TradingNFTs.filter(nft =>
    selectedCategory === categories.all ? true : nft.category === selectedCategory
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update the selected category
  };

  return (
    <div className="sm:px-0 px-3">
      <div id="section-1" className="flex flex-col gap-3 w-full h-[9pc] sm:h-[15pc] items-center justify-center">
        <h2 className="text-2xl sm:text-3xl dark:text-white/90 font-semibold">
          Explore NFTs
        </h2>
        <div className="flex gap-3 text-sm sm:text-base dark:text-white">
          <span className="dark:text-white/80">Home</span> / <span className="dark:text-white/50">Explore</span>
        </div>
      </div>

      <div id="section-2" className="flex lg:flex-row flex-col gap-10">
        <div className="w-full relative flex flex-col gap-14">
          <div className="flex gap-7 relative z-10 flex-wrap justify-between">
            <div className="flex sm:text-base text-xs gap-3 sm:justify-start justify-center sm:gap-7 flex-wrap">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex border-[1px] border-gray-700/70 items-center justify-center rounded-full cursor-pointer backdrop-blur-lg transition-all capitalize hover:bg-purple-500/90 active:bg-purple-700 px-6 py-2 ${
                    selectedCategory === category ? "bg-purple-500/90" : "bg-darkBlue-400/90"
                  } text-white`}
                >
                  {category}
                </button>
              ))}
            </div>
            <ul className="flex self-end flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="me-2">
                <Link
                  to="/explore"
                  className={`${
                    URLpath.pathname === "/explore"
                      ? "inline-block px-4 py-3 text-white bg-gradient-to-tr from-purple-700 to-purple-400 rounded-lg"
                      : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 bg-darkBlue-200/30 dark:hover:bg-darkBlue-400 dark:hover:text-white"
                  }`}
                >
                  NFTs only
                </Link>
              </li>
              <li className="me-2">
                <Link
                  to="/explore/collections"
                  className={`${
                    URLpath.pathname === "/explore/collections"
                      ? "inline-block px-4 py-3 text-white bg-gradient-to-tr from-pink-700 to-pink-400 rounded-lg"
                      : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 bg-darkBlue-200/30 dark:hover:bg-darkBlue-400 dark:hover:text-white"
                  }`}
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <Routes>
            <Route index element={<ShopNFTs items={filteredNFTs} />} />
            <Route path="collections" element={<ShopCollections items={filteredNFTs} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Explore;

















































// import React from "react";
// import { MdRestartAlt } from "react-icons/md";
// import { Link, Route, Routes, useLocation } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

// import ShopNFTs from "./Components/ShopNFTs";
// import ShopCollections from "./Components/ShopCollections";

// function Explore() {
//   const URLpath = useLocation();
//   const [categories, setcategories] = useState({
//     all:"all",
//     sports: "sports",
//     music: "music",
//     art : "art",
//     Photography:"Photography",
//     utility: "utility",
//     gaming:"gaming",
//   })
//   const [TradingNFTs, setTradingNFTs] = useState([]);

//   const category = [
//     "all",
//     "sports",
//     "music",
//     "art",
//     "Photography",
//     "utility",
//     "gaming",
//   ];

//   const [searchParams, setSearchParams] = useSearchParams({
//     search: "",
//     category: "",
//   });


//   useEffect(() => {
//     const fetching = async () => {
//         try {
//           const response = await getActiveListings();
//           console.log("🚀 ~ .then ~ response:", response);
      
//           // Create an empty array to store formatted items
//           const formattedListings = [];
      
//           // Iterate over each item in the response
//           for (const item of response) {
//             const formattedItem = {
//               itemId: item.itemId.toString(),
//               nftContract: item.nftContract,
//               tokenId: item.tokenId.toString(),
//               owner: item.owner,
//               seller: item.seller,
//               price: item.price.toString(),
//               currentlyListed: item.currentlyListed,
//             };
      
//             // Fetch the tokenURI and metadata using the tokenId
//             // const tokenURI = await nftContract.methods.tokenURI(formattedItem.tokenId).call();
//             const url = await tokenURI(formattedItem.tokenId)
            
//             // Fetch metadata from the tokenURI
//             const parsedFile = await fetchMetadataFromPinata(url);
//             const metadata = JSON.parse(parsedFile.file);
            
      
//             // Add each field of metadata to the formatted item
//             formattedItem.name = metadata.name;
//             formattedItem.description = metadata.description;
//             formattedItem.image = metadata.image; // assuming the metadata has an `image` field
//             formattedItem.category = metadata.catogory; // add other fields as needed
//             formattedItem.properties = metadata.properties; // add other fields as needed
//             formattedItem.royalties = metadata.royalties; // add other fields as needed
//             // formattedItem.creator = metadata.creator; // add other fields as needed
      
//             // Push the formatted item into the array
//             formattedListings.push(formattedItem);
//           }
      
//           // Now set the state with the entire array of listings
//           setTradingNFTs(formattedListings);
//         } catch (error) {
//           console.error("Error fetching active listings or metadata:", error);
//         }
//       }
                  
//       // await getActiveListings()
//       //   .then((response) => {
//       //     console.log("🚀 ~ .then ~ response:", response);
//       //     // Iterate over each item in the response
//       //     response.forEach((item) => {
//       //       const formattedItem = {
//       //         itemId: item.itemId.toString(), // Convert BigInt to string
//       //         nftContract: item.nftContract,
//       //         tokenId: item.tokenId.toString(), // Convert BigInt to string
//       //         owner: item.owner,
//       //         seller: item.seller,
//       //         price: item.price.toString(), // Convert BigInt to string
//       //         currentlyListed: item.currentlyListed,
//       //       };

//       //       setTradingNFTs(formattedItem);
//       //     });

//       //     // setTradingNFTs(response)
//       //   })
//       //   .catch((error) => {
//       //     console.error(error);
//       //     ErrorToast(<div>Something error happen try agin 💔 !</div>);
//       //   });

//       // try {
//       // } catch (error) {
//       //   console.log(error);
//       // }

//     fetching();
//   }, []);


//   const handleParams = (e) => {
//     setSearchParams((prevSearchParams) => {
//       const newParams = new URLSearchParams(prevSearchParams);
//       newParams.set(e.target.name, e.target.value);
//       return newParams;
//     });
//   };

//   // State to hold the currently selected category
// const [selectedCategory, setSelectedCategory] = useState(categories.all);

// // Function to handle category selection
// const handleCategoryChange = (category) => {
//   setSelectedCategory(category);
// };

// // Filter TradingNFTs based on the selected category
// const filteredNFTs = TradingNFTs.filter((nft) =>
//   selectedCategory === categories.all ? true : nft.category === selectedCategory
// );

//   return (
//     <div className="sm:px-0 px-3">
//       <div
//         id="section-1"
//         className="flex flex-col gap-3 w-full h-[9pc] sm:h-[15pc] items-center justify-center "
//       >
//         <h2 className="text-2xl sm:text-3xl dark:text-white/90 font-semibold">
//           Explore NFTs
//         </h2>
//         <div className="flex gap-3 text-sm sm:text-base dark:text-white">
//           <span className="dark:text-white/80">Home</span>/
//           <span className="dark:text-white/50">Explore</span>
//         </div>
//       </div>
//       <div id="section-2" className="flex lg:flex-row flex-col gap-10">
//         <div className="w-full relative flex flex-col gap-14">
//           {/* <div className="bg-gradient-to-r from-purple-800 to-pink-600 absolute right-1 bottom-[50%] h-96 w-96 blur-[10pc] opacity-[30%]" /> */}
//           <div className="flex gap-7 relative z-10 flex-wrap justify-between">
//             <div className="flex sm:text-base text-xs gap-3 sm:justify-start justify-center sm:gap-7 relative z-10 flex-wrap">
//               {category?.map((category) => (
//                 <label
//                   key={category}
//                   htmlFor={category}
//                   className={`flex sm:flex-0 flex-auto flex-wrap border-[1px] border-gray-700/70 items-center justify-center rounded-full cursor-pointer backdrop-blur-lg transition-all capitalize hover:bg-purple-500/90 active:bg-purple-700 px-6 py-2 ${
//                     searchParams.get("category") === category
//                       ? "bg-purple-500/90"
//                       : "bg-darkBlue-400/90"
//                   } text-white`}
//                 >
//                   <input
//                     type="radio"
//                     id={category}
//                     name="category"
//                     value={category}
//                     className="hidden"
//                     onClick={handleParams}
//                   />
//                   {category}
//                 </label>
//               ))}
//             </div>
//             <ul
//               id="explore-page-ul"
//               className="flex self-end flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
//             >
//               <li className="me-2">
//                 <Link
//                   to="/explore"
//                   className={
//                     URLpath.pathname == "/explore"
//                       ? "inline-block px-4 py-3 text-white bg-gradient-to-tr from-purple-700 to-purple-400 rounded-lg"
//                       : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 bg-darkBlue-200/30 dark:hover:bg-darkBlue-400  dark:hover:text-white"
//                   }
//                 >
//                   Nfts only
//                 </Link>
//               </li>
//               <li className="me-2">
//                 <Link
//                   to="/explore/collections"
//                   className={
//                     URLpath.pathname == "/explore/collections"
//                       ? "inline-block px-4 py-3 text-white bg-gradient-to-tr from-pink-700 to-pink-400 rounded-lg"
//                       : "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 bg-darkBlue-200/30 dark:hover:bg-darkBlue-400  dark:hover:text-white"
//                   }
//                 >
//                   Collections
//                 </Link>
//               </li>
//             </ul>
//             <form className="flex gap-2 w-full">
//               <div className="flex w-full lg:w-auto gap-2">
//                 <input
//                   className=" bg-gray-50 text-gray-900 rounded-lg focus:ring-0 focus:dark:border-pink-500 block w-full p-2.5 dark:bg-darkBlue-600/60 dark:border-gray-600/30 dark:placeholder-gray-500 dark:text-white/70 text-sm sm:text-base"
//                   type="text"
//                   id="search"
//                   name="search"
//                   placeholder="Search by title..."
//                   required
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="py-2.5 px-5 hover:bg-darkBlue-400 border-[1px] border-gray-700/70 active:bg-darkBlue-600 transition-all active:scale-95 bg-darkBlue-500 rounded-md text-white/90"
//                 onClick={() =>
//                   setSearchParams((prevSearchParams) => {
//                     const newParams = new URLSearchParams(prevSearchParams);
//                     newParams.set(
//                       "search",
//                       document.getElementById("search").value
//                     );
//                     return newParams;
//                   })
//                 }
//               >
//                 <svg
//                   className="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </button>
//               <button
//                 type="button"
//                 className="px-3 hover:bg-darkBlue-400 border-[1px] flex items-center gap-2 border-gray-700/70 active:bg-darkBlue-600 transition-all active:scale-95 bg-darkBlue-500 rounded-md text-white/90"
//                 onClick={() =>
//                   setSearchParams((prevSearchParams) => {
//                     const newParams = new URLSearchParams(prevSearchParams);
//                     newParams.set("search", "");
//                     newParams.set("category", "");
//                     return newParams;
//                   })
//                 }
//               >
//                 <MdRestartAlt /> Reset
//               </button>
//             </form>
//           </div>
//           <div className=" sm:bg-gradient-to-r from-purple-800 to-pink-600 absolute h-96 w-96 blur-[10pc] opacity-[30%]" />
//           <div className="flex gap-7 relative z-10 flex-col justify-between">
//             <Routes>
//               <Route index element={<ShopNFTs filters={searchParams} />} />
//               <Route
//                 path="collections"
//                 element={<ShopCollections filters={searchParams} />}
//               />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Explore;
