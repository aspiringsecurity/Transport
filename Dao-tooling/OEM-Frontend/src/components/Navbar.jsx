import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import logo from "@assets/logo.png";
import { useAccount } from "wagmi";
import { connectWallet, disConnectWallet } from "../Blockchain.services";
import { useEffect } from "react";
import { truncate, useGlobalState } from "../store";
//import { login } from "../utils/auth";

const Navbar = () => {
  // const { address, isConnecting, isDisconnected } = useAccount();
  const [connectedAddress] = useGlobalState("connectedAddress");
  //const [userId] = useGlobalState("userId");

  return (
    <>
      <nav className="flex  items-center justify-between px-4 fixed top-0 right-0 left-0 z-20 bg-white ">
        <div className="flex  items-center  space-x-14  h-full">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <ul className=" border-b md:border-none flex justify-end space-x-14 list-reset m-0 w-full md:w-auto text-rnBlack">
            <li className="border-t md:border-none">
              <Link
                to="/problems"
                className="block md:inline-block  py-4 no-underline    font-semibold"
              >
                Problems
              </Link>
            </li>

            <li className="border-t md:border-none">
              <Link
                to="/solutions"
                className="block md:inline-block  py-4  no-underline r font-semibold"
              >
                Solutions
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className=" flex justify-end space-x-6  w-full  text-rnBlack">
            {/* <div className="py-4  tracking-wide   ">
              {address
                ? address.slice(0, 10) + "..." + address.slice(35)
                : "Not Connected"}
            </div> */}

            {/* <span className="mt-1">
              <ConnectKitButton />
            </span> */}
            {!connectedAddress && (
              <button
                className="w-fit py-2 px-3 bg-gray-200 rounded-md font-semibold hover:bg-rnBlack hover:text-white"
                onClick={connectWallet}
                type="button"
              >
                Connect wallet
              </button>
            )}
            {connectedAddress && (
              <button
                className="w-fit py-2 px-3 bg-gray-200 rounded-md font-semibold hover:bg-rnBlack hover:text-white"
                // onClick={disConnectWallet}
                type="button"
              >
                {truncate(connectedAddress, 4, 4, 11)}
              </button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
