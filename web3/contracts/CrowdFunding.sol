// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign { // struct is like an object in JS
        address owner; // address of the owner of the campaign
        string title; // title of the campaign
        string description; // description of the campaign
        uint256 target; // target amount for the campaign we want to achieve
        uint256 deadline; // deadline for the campaign
        uint256 amountCollected; // amount collected for the campaign
        string image; // image of the campaign, images's url
        address[] donators; // array of addresses of the donators
        uint256[] donations; // array of donations made by the donators
    }

    mapping(uint256 => Campaign) public campaigns; // mapping of campaign id to campaign

    uint256 public numberOfCampaigns = 0; // global/public variable for total number of campaigns

    // Functions for our SmartContract
    // Function to create a campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns]; // create a new campaign

        // require is like an if statement, it checks if the condition is true
        require(campaign.deadline < block.timestamp, "The deadline should be in the future"); // check if the deadline is in the future
        
        campaign.owner = _owner; // set the owner of the campaign
        campaign.title = _title; // set the title of the campaign
        campaign.description = _description; // set the description of the campaign
        campaign.target = _target; // set the target of the campaign
        campaign.deadline = _deadline; // set the deadline of the campaign
        campaign.amountCollected = 0; // set the amount collected to 0
        campaign.image = _image; // set the image of the campaign

        numberOfCampaigns++; // increment the number of campaigns

        return numberOfCampaigns - 1; // return the id of the new campaign
    }

    // Function to donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value; // get the amount donated
        Campaign storage campaign = campaigns[_id]; // get the campaign

        require(campaign.deadline > block.timestamp, "The deadline has passed"); // check if the deadline has passed
        require(campaign.target > campaign.amountCollected, "The target has already been reached"); // check if the target has been reached

        campaign.donators.push(msg.sender); // add the donator to the array of donators
        campaign.donations.push(amount); // add the donation to the array of donations

        (bool sent, ) = payable(campaign.owner).call{value: amount}(""); // send the amount to the owner of the campaign
        if (sent) {
            campaign.amountCollected += amount; // increment the amount collected
        }
    }

    // Function to get the donators, and donations of a campaign
    function getDonators (uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations); // return the donators and donations
    }

    // function getCampaign(uint256 _id) public view returns (Campaign memory) {
    //     return campaigns[_id]; // return the campaign
    // }

    // Function to get the campaigns
    function getCampaigns () public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); // create a new empty array of campaigns

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i]; // add the campaign to the array
        }
        return allCampaigns; // return the array of campaigns
    }
}