import Web3 from "web3";
import store from "../app/redux/ReduxStore";
import { setEthAccount } from "../app/redux/ReduxSlices";
import { getUserNamePicByEthAddress } from "../apis/profile.apis";

export const WalletInstance = window.ethereum || "";

export const Connect = async () => {
  if (WalletInstance) {
    try {
      const web3 = new Web3(window.ethereum);

      await window.ethereum.enable();

      const EthAccounts = await web3.eth.getAccounts(); 

      if (EthAccounts.length > 0) {
        const EthAccountBalanceInWei = await web3.eth.getBalance(
          EthAccounts[0]
        );

        const Balance = web3.utils.fromWei(EthAccountBalanceInWei, "ether");
        console.log("🚀 ~ Connect ~ Balance:", Balance)

        // const userProfile = await getUserNamePicByEthAddress(EthAccounts[0]);
        // const userProfile = '';

        store.dispatch(
          setEthAccount({
            isConnect: true,
            account: EthAccounts[0],
            balance: Balance,
            // userName: userProfile.userName ?? "enoch",
            userName: "enoch",
            userAvatar: "enoch",
          })
        );

        // nullish coalescing operator { ?? } provide default values when the properties are null or undefined

        localStorage.setItem("IsMetamaskConnect", "true");
      } else {
        console.log("No account available ");
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  } else {
    return false;
  }
};

// export const Connects = async () => {
//   if (WalletInstance) {
//     try {
//       const web3 = new Web3(window.ethereum);

//       await window.ethereum.enable();

//       const EthAccounts = await web3.eth.getAccounts(); 

//       if (EthAccounts.length > 0) {
//         const EthAccountBalanceInWei = await web3.eth.getBalance(
//           EthAccounts[0]
//         );

//         const Balance = web3.utils.fromWei(EthAccountBalanceInWei, "ether");
//         console.log("🚀 ~ Connect ~ Balance:", Balance)

//         // const userProfile = await getUserNamePicByEthAddress(EthAccounts[0]);
//         // const userProfile = '';

//         store.dispatch(
//           setEthAccount({
//             isConnect: true,
//             account: EthAccounts[0],
//             balance: Balance,
//             // userName: userProfile.userName ?? "enoch",
//             userName: "enoch",
//             userAvatar: "enoch",
//           })
//         );

//         // nullish coalescing operator { ?? } provide default values when the properties are null or undefined

//         localStorage.setItem("IsMetamaskConnect", "true");
//       } else {
//         console.log("No account available ");
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     return false;
//   }
// };

//  //FUNCTION
//   const checkIfWalletConnected = async () => {
//     try {
//       if (!window.ethereum) return alert("No account found");
//       // await handleNetworkSwitch();
//       const accounts = await window.ethereum.request({
//         method: "eth_accounts",
//       });

//       if (accounts.length) {
//         setAddress(accounts[0]);

//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         const getbalance = await provider.getBalance(accounts[0]);
//         const bal = ethers.utils.formatEther(getbalance);
//         setAccountBalance(bal);
//         return accounts[0];
//       } else {
//         notifyError("No account found");
//       }
//     } catch (error) {
//       console.log(error);
//       // notifyError("Please install Metamask");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletConnected();
//     //  ICO_MARKETPLACE_CONTRACT();
//     //  TOKEN_CONTRACT("0xe87f0EdD220680d5A56fe3d374c81EBe1e0AB9A2");
//   }, [address]);
//   //   https://rpc.ankr.com/polygon_amoy/938dc60fa369e5b3b4001273899e6da7096c2d1fa98269d57cfb77ff04b21f18

//   const connectWallet = async () => {
//     if (!window.ethereum) return notifyError("No account available");
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       if (accounts.length) {
//         setAddress(accounts[0]);

//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         console.log("here");
//         const getbalance = await provider.getBalance(accounts[0]);
//         const bal = ethers.utils.formatEther(getbalance);
//         setAccountBalance(bal);
//         return accounts[0];
//       } else {
//         notifyError("No account found");
//       }
//     } catch (error) {
//       console.log(error);
//       setLoader(false);
//       notifyError("Error connecting wallet");
//     }
//   };
