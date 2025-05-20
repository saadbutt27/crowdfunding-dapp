import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: string;
  amountCollected: string;
  image: string;
  pId: number
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const context = useStateContext();
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  const { address, contract, getUserCampaigns } = context;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    if (data) {
      setCampaigns(data as Campaign[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
