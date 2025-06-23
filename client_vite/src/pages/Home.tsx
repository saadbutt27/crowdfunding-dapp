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
  pId: number;
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableCampaigns, setAvailableCampaigns] = useState<Campaign[]>([]);
  const [unavailableCampaigns, setUnavailableCampaigns] = useState<Campaign[]>([]);

  const context = useStateContext();
  if (!context) {
    throw new Error("useStateContext must be used within a StateContextProvider");
  }

  const { address, contract, getCampaigns } = context;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    if (data) {
      const now = Date.now();
      const available = (data as Campaign[]).filter(
        (c) => Number(c.deadline) > now
      );
      const unavailable = (data as Campaign[]).filter(
        (c) => Number(c.deadline) <= now
      );

      setAvailableCampaigns(available);
      setUnavailableCampaigns(unavailable);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <div className="flex flex-col gap-10">
      <DisplayCampaigns
        title="Available Campaigns"
        isLoading={isLoading}
        campaigns={availableCampaigns}
      />
      <DisplayCampaigns
        title="Unavailable Campaigns"
        isLoading={isLoading}
        campaigns={unavailableCampaigns}
      />
    </div>
  );
};

export default Home;
