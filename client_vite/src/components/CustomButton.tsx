import React from 'react'

interface CustomButtonProps {
  btnType?: "button" | "submit" | "reset";
  title: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick, styles, disabled }) => {
  return (
    <button
        type={btnType || 'button'}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles} 
        ${disabled ? 'bg-[#8c6dfd] opacity-50 cursor-not-allowed' : 'bg-[#8c6dfd] hover:bg-[#7a5cd9] active:bg-[#6a4bc7] focus:outline-none focus:ring-2 focus:ring-[#8c6dfd] focus:ring-opacity-50'}
        `}
        onClick={handleClick}
        disabled={disabled}
    >
        {title}
    </button>
  )
}

export default CustomButton