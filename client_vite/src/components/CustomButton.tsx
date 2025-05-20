import React from 'react'

interface CustomButtonProps {
  btnType?: "button" | "submit" | "reset";
  title: React.ReactNode;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
        type={btnType || 'button'}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton