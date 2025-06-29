import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo } from "../assets";
import { navlinks } from "../constants";

type IconProps = {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string | boolean;
  handleClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  isActive,
  handleClick,
}) => {
  return (
    <div className="relative group">
      <div
        className={`w-[48px] h-[48px] rounded-[10px] ${
          isActive && isActive === name && "bg-[#2c2f32]"
        } flex justify-center items-center cursor-pointer ${styles}`}
        onClick={handleClick}
      >
        <img
          src={imgUrl}
          alt={`${name}_icon`}
          className={`w-1/2 h-1/2 ${isActive !== name && isActive && "grayscale"}`}
        />
      </div>

      {/* Tooltip */}
      {name && (
        <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bh-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] mt-12 py-4">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                setIsActive(link.name);
                navigate(link.link);
              }}
            />
          ))}
        </div>
        {/* <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} /> */}
      </div>
    </div>
  );
};

export default Sidebar;
