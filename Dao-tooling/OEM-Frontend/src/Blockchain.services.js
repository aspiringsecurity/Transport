//communication with blockchain enters here
// import Web3 from "web3";

import { toast } from "react-hot-toast";
import { SwitchChainNotSupportedError } from "wagmi";
import { setGlobalState, setUserId } from "./store";
import { login } from "./utils/auth";

const { ethereum } = window;
// window.web3 = new Web3(ethereum);
// window.web3 = new Web3(window.web3.currentProvider);

export const verifyNetwork = () => {
  if (window.ethereum.networkVersion != 592)
    toast.error("Please switch to Astar network.");
};

const createAstarNetwork = async () => {
  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x250",
          chainName: "Astar Network Mainnet",
          rpcUrls: ["https://evm.astar.network"],
          blockExplorerUrls: ["https://blockscout.com/astar"],
          nativeCurrency: {
            symbol: "ASTR",
            decimals: 18,
          },
        },
      ],
    });

    toast("Welcome to Astar, please connect wallet ", {
      icon: "👏😯",
    });
  } catch (err) {
    console.log(err);
  }
};

const switchUserChain = async () => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x250" }],
    });
    toast.success("You have switched to Astar network");
  } catch (switchError) {
    //The network has not been added to MetaMask
    if (switchError.code === 4902) {
      toast("oops! Astar not found, let's create it... ", {
        icon: "😯",
      });

      createAstarNetwork();
    }
    //console.log(switchError);
  }
};

export const connectWallet = async () => {
  if (window.ethereum.networkVersion != 592) {
    toast("oops! Wrong network detected, switching to Astar... ", {
      icon: "😯",
    });
    switchUserChain();
    return;
  }
  try {
    if (!ethereum) toast.error("Please install Metamask");
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    login(accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};
export const disConnectWallet = async () => {
  window.localStorage.removeItem("access_token");
  setGlobalState("connectedAddress", "");
  setGlobalState("userId", "");
  window.location.reload();
};

export const isWallectConnected = async () => {
  try {
    if (!ethereum) return toast.error("Metamask not installed,");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // window.ethereum.on("chainChanged", (chainId) => {
    //   window.location.reload();
    // });
    // //console.log(accounts);
    // window.ethereum.on("accountsChanged", async () => {
    //   setGlobalState("connectedAccount", accounts[0].toLowerCase());
    //   await isWallectConnected();
    // });

    if (accounts.length) {
      setGlobalState("connectedAddress", accounts[0].toLowerCase());
      //get user id from local storage
      setUserId(localStorage.getItem("user_id"));
    } else {
      localStorage.setItem("user_id", "");
      //toast.error("Please connect wallet");
    }
  } catch (error) {
    console.log(error);
  }
};
