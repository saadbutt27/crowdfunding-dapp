// File for All web 3 logic
// web3Context.tsx
import React, { useContext, createContext, ReactNode } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Define the type of form used in publishCampaign
interface CampaignForm {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}
interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: string;
  amountCollected: string;
  image: string;
  pId: number;
}

// Define the context type
import type { SmartContract } from "@thirdweb-dev/react";
import type { BaseContract } from "ethers";

interface StateContextType {
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  connect: () => void;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<Campaign[] | undefined>;
  getUserCampaigns: () => Promise<Campaign[] | undefined>;
  donate: (
    pId: number,
    amount: number
  ) => Promise<{ pId: number; amount: number } | undefined>;
  getDonations: (
    pId: number
  ) => Promise<{ donator: string; donation: string }[] | undefined>;
}

// ✅ Correctly typed createContext
const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract(
    "0xD19aeEAE77Ea59A0e10c9EBE0F1b7be1Fc1745DC"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: CampaignForm) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    if (!contract) {
      console.log("Contract is not initialized");
      return;
    }
    const campaigns = await contract.call("getCampaigns"); // ✅ Correctly typed contract call

    const parsedCampaigns = campaigns.map(
      (campaign: Campaign, index: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: index,
      })
    );
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    if (!contract) {
      console.log("Contract is not initialized");
      return;
    }

    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns?.filter(
      (campaign: Campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId: number, amount: number) => {
    console.log(pId, amount);
    if (!contract || !amount) {
      console.log("Contract or address or amount is not initialized");
      return;
    }
    const data = await contract.call(
      "donateToCampaign",
      [pId],
      { value: ethers.utils.parseEther(amount.toString()) }
    );
    return data;
  };

  const getDonations = async (pId: number) => {
    if (!contract) {
      console.log("Contract is not initialized");
      return;
    }
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsetDonations: { donator: string; donation: string }[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsetDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]).toString(),
      });
    }

    return parsetDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// ✅ Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
