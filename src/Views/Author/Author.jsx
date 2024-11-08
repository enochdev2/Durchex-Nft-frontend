import React, { useState, useEffect } from "react";

import { FaEthereum, FaFacebook, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Tooltip } from "flowbite-react";
import {
  MdContentCopy,
  MdOutlineOpenInNew,
  MdShoppingCart,
} from "react-icons/md";

import demoAvatar from "../../assets/images/user-demo-avatar.svg";
import { web3 } from "../../hooks/useContract";
import AuthorCreated from "./components/AuthorCreated";
import AuthorOwned from "./components/AuthorOwned";
import AuthorCollections from "./components/AuthorCollections";
import AuthorDetails from "./components/AuthorDetails";
import { getUserDetailsByEthAddress } from "../../apis/profile.apis";
import { useSearchParams } from "react-router-dom";
import { fetchNFT } from "../../hooks/ContractControllers/useFetchNFTByUser";
import { getCollectionsByUser } from "../../apis/Collections.apis";
import { addVendor, removeVendor } from "../../hooks/ContractControllers/useMintNFT";
import { useSelector } from "react-redux";
import { SuccessToast } from "../../app/Toast/Success";
import { ErrorToast } from "../../app/Toast/Error";

function Author() {
  const { id } = useParams();
  const [AuthorDetailsData, setAuthorDetailsData] = useState({});
  const [AuthorCollectionsData, setAuthorCollectionsData] = useState([]);
  const [AuthorNFTs, setAuthorNFTs] = useState([]);
  const [address, setAddress] =  useState("");
  
  
  
  const UserEthAccount = useSelector((state) => state.EthAccountStates);
  
  
  
  
  console.log("🚀 ~ Author ~ address:", address)
  
  useEffect(() => {
    const fetching = async () => {
      const response = await fetchNFT(id);
      const CreatedData = await Promise.all(
        response.Created.map(async (item) => {
          return mapArray(item);
        })
      );
      const OwnedData = await Promise.all(
        response.Owned.map(async (item) => {
          return mapArray(item);
        })
      );
      setAuthorNFTs({
        Created: CreatedData,
        Owned: OwnedData,
      });
      try {
      } catch (error) {
        console.log(error);
      }
    };
    // fetching();
  }, [id]);

  useEffect(() => {
    const fetching = async () => {
      const response = await getUserDetailsByEthAddress(id);
      const result = await getCollectionsByUser(id);
      setAuthorCollectionsData(result);
      setAuthorDetailsData(response);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    // fetching();
  }, [id]);

  const HandleAddVendor = async (event) => {
    event.preventDefault();

    try {

      const vendorNFTAddress = process.env.REACT_APP_VENDORNFT_CONTRACT_ADDRESS;
      console.log("🚀 ~ HandleMintNFT ~ vendorNFTAddress:", vendorNFTAddress)

 

     await addVendor(UserEthAccount.account, address)
        .then((response) => {
          SuccessToast(
            <div>
              Vendor added successfully 🎉 ! <br />
              <div className=" line-clamp-1">
                Gas used :
                <b className=" font-normal text-darkBlue-50">
                  {" "}
                  {response.gasUsed.toString()}
                </b>{" "}
                in wei
              </div>
            </div>
          );
        })
        .catch((error) => {
          console.error(error);
          ErrorToast(<div>Something error happen try agin 💔 !</div>);
        });
    } catch (error) {
      console.error(error);
    }

    
  }
  const HandleRemoveVendor = async (event) => {
    event.preventDefault();

    try {

      const vendorNFTAddress = process.env.REACT_APP_VENDORNFT_CONTRACT_ADDRESS;
      console.log("🚀 ~ HandleMintNFT ~ vendorNFTAddress:", vendorNFTAddress)

 

     await removeVendor(UserEthAccount.account, address)
        .then((response) => {
          SuccessToast(
            <div>
              Vendor added successfully 🎉 ! <br />
              <div className=" line-clamp-1">
                Gas used :
                <b className=" font-normal text-darkBlue-50">
                  {" "}
                  {response.gasUsed.toString()}
                </b>{" "}
                in wei
              </div>
            </div>
          );
        })
        .catch((error) => {
          console.error(error);
          ErrorToast(<div>Something error happen try agin 💔 !</div>);
        });
    } catch (error) {
      console.error(error);
    }

    
  }
  const HandleOnChange = (e) => {
    setAddress(e.target.value);

  }

  // const getMetadata = async (uri) => {
  //   try {
  //     if (uri) {
  //       const response = await axios.get(
  //         `https://cloudflare-ipfs.com/ipfs/${uri}`
  //       );
  //       return response.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const mapArray = async (item) => {
  //   const metaDataObject = await getMetadata(item.uri.slice(7));
  //   if (metaDataObject) {
  //     return {
  //       price: web3.utils.fromWei(item.price.toString(), "ether"),
  //       NFTid: parseInt(item.tokenId),
  //       name: `${metaDataObject.name} #${item.tokenId}`,
  //       description: metaDataObject.description,
  //       properties: metaDataObject.properties,
  //       createdBy: item.creator,
  //       image: `https://cloudflare-ipfs.com/ipfs/${metaDataObject.image.slice(
  //         7
  //       )}`,
  //     };
  //   }
  // };

  return (
    <div className="mt-14 sm:p-0 p-5 flex flex-col gap-5">
      <div
        id="profile"
        className="relative h-[25pc] flex justify-center items-center"
      >
        <div className="absolute overflow-hidden lg:h-full lg-w-auto h-[50%] w-[60pc] xl:w-full top-0 rounded-lg opacity-90">
        <form onSubmit={HandleAddVendor} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label
                htmlFor=""
                className="text-white/70 font-semibold text-sm sm:text-base"
              >
                Add Vendors*
              </label>
              <input
                className=" bg-gray-50 text-gray-900 rounded-lg focus:ring-0 focus:dark:border-pink-500 block w-full p-2.5 dark:bg-darkBlue-600 dark:border-gray-600/30 dark:placeholder-gray-500 dark:text-white/70 text-sm sm:text-base"
                type="text"
                placeholder="Vendor Address"
                name="name"
                onChange={HandleOnChange}
                required
              />
            </div>
            
            <div className="flex gap-5 mb-5">
              <button
                type="submit"
                className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              >
                Submit
              </button>
              <Link
                type="submit"
                to="/myProfile"
                className="text-white bg-darkBlue-700 hover:bg-darkBlue-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 cursor-pointer text-center dark:bg-darkBlue-500 dark:hover:bg-darkBlue-600 dark:focus:ring-darkBlue-400"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              onClick={HandleRemoveVendor}
              >
                Remove
              </button>
            </div>

          </form>


          <img
            id="bg-image"
            className="w-full"
            src="https://image.lexica.art/full_webp/152901c2-5a39-4b61-b178-16d5f0a8365d"
            alt=""
          />
        </div>
        <div className="z-10 relative flex flex-col  gap-3 sm:gap-2 items-center w-max p-3 rounded-lg">
          <img
            className="w-28 h-28 border-4 dark:border-darkBlue-200 rounded-lg bg-darkBlue-400"
            src={AuthorDetailsData?.userProfile || demoAvatar}
            alt=""
          />
          {/* <div className="z-[-1] bg-gradient-to-r from-purple-800 to-pink-600 absolute bottom-0 h-96 w-96 blur-[10pc] opacity-[30%]" /> */}
          <h2 className="dark:text-white/90 text-xl sm:text-2xl font-semibold p-1 px-5 rounded-lg backdrop-blur-md">
            {AuthorDetailsData?.userName}
          </h2>
          <span className="dark:text-white/70 text-md flex sm:text-base text-sm items-center gap-1 p-1 px-5 rounded-lg backdrop-blur-md">
            <FaEthereum /> {id ? `${id?.slice(0, 5)}...${id?.slice(38)}` : ""}
          </span>
          <p className="dark:text-white/50 text-md sm:w-[30pc] text-center sm:text-base text-sm">
            {AuthorDetailsData?.userBio}
          </p>
          <div className="text-white/90 flex sm:gap-2 gap-5">
            <Link
              to={
                AuthorDetailsData?.socialLink
                  ? AuthorDetailsData?.socialLink.x
                  : ""
              }
              target="_BLANK"
            >
              <FaXTwitter className="sm:h-7 sm:p-1 sm:w-8 active:bg-pink-700 transition-all rounded-md cursor-pointer hover:bg-pink-700/80 " />
            </Link>
            <Link
              to={
                AuthorDetailsData?.socialLink
                  ? AuthorDetailsData?.socialLink?.facebook
                  : ""
              }
              target="_BLANK"
            >
              <FaFacebook className="sm:h-7 sm:p-1 sm:w-8 active:bg-pink-700 transition-all rounded-md cursor-pointer hover:bg-pink-700/80" />
            </Link>
            <Link
              to={
                AuthorDetailsData?.socialLink
                  ? AuthorDetailsData?.socialLink.telegram
                  : ""
              }
              target="_BLANK"
            >
              <FaTelegramPlane className="sm:h-7 sm:p-1 sm:w-8 active:bg-pink-700 transition-all rounded-md cursor-pointer hover:bg-pink-700/80" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 flex-wrap">
        <div
          id="details"
          className="flex flex-auto flex-col p-4 gap-3 dark:border-darkBlue-500 rounded-lg border-[1px]"
        >
          <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
            Details
          </h2>
          <div id="collection" className="flex flex-wrap">
            <AuthorDetails
              details={{
                ...AuthorDetailsData,
                profileAddress:id,
                nft: AuthorNFTs.Created ? AuthorNFTs.Created?.length : 0,
                collections: AuthorCollectionsData?.length,
              }}
              AuthorId={id}
            />
          </div>
        </div>
        <div
          id="created"
          className="flex flex-auto flex-col p-4 gap-3 dark:border-darkBlue-500 rounded-lg border-[1px]"
        >
          <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
            All Created NFTS
          </h2>
          <div id="collection" className="flex flex-wrap">
            <AuthorCreated NFTs={AuthorNFTs ? AuthorNFTs?.Created : []} />
          </div>
        </div>
        <div
          id="owned"
          className="flex flex-1 flex-col p-4 gap-3 rounded-lg dark:border-darkBlue-500 border-[1px]"
        >
          <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
            All Owned NFTs
          </h2>
          <div id="collection" className="flex flex-wrap">
            <AuthorOwned NFTs={AuthorNFTs ? AuthorNFTs?.Owned : []} />
          </div>
        </div>
        <div
          id="collection"
          className="flex flex-auto flex-col p-4 gap-5 rounded-lg dark:border-darkBlue-500 border-[1px]"
        >
          <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
            All Collections
          </h2>
          <div id="collection" className="flex flex-wrap">
            <AuthorCollections CollectionsData={AuthorCollectionsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;

const UiOne = ({ AuthorComponents }) => {
  return (
    <div className="flex flex-col gap-5 flex-wrap">
      <div
        id="details"
        className="flex flex-auto flex-col p-4 gap-3 dark:border-darkBlue-500 rounded-lg border-[1px]"
      >
        <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
          Details
        </h2>
        <div id="collection" className="flex flex-wrap">
          {AuthorComponents["details"]}
        </div>
      </div>
      <div
        id="created"
        className="flex flex-auto flex-col p-4 gap-3 dark:border-darkBlue-500 rounded-lg border-[1px]"
      >
        <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
          All Created NFTS
        </h2>
        <div id="collection" className="flex flex-wrap">
          {AuthorComponents["created"]}
        </div>
      </div>
      <div
        id="owned"
        className="flex flex-1 flex-col p-4 gap-3 rounded-lg dark:border-darkBlue-500 border-[1px]"
      >
        <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
          All Owned NFTs
        </h2>
        <div id="collection" className="flex flex-wrap">
          {AuthorComponents["owned"]}
        </div>
      </div>
      <div
        id="collection"
        className="flex flex-auto flex-col p-4 gap-5 rounded-lg dark:border-darkBlue-500 border-[1px]"
      >
        <h2 className="text-white/90 font-semibold text-xl sm:text-2xl">
          All Collections
        </h2>
        <div id="collection" className="flex flex-wrap">
          {AuthorComponents["collections"]}
        </div>
      </div>
    </div>
  );
};
