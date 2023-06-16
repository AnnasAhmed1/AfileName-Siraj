import React from "react";

const ButtonComp = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <button
      className={`
        text-sm
        sm:text-xs
        text-white
        bg-[#1890FF]
        border
        p-1
        border-[#1890FF]
        mx-auto/
        flex
        w-[90%]
        justify-center
        my-[40px]
        sm:my-[25px]
        mr-[10px]
        sm:mr-[5px]
        ${className}
       `}
    >
      {text}
    </button>
  );
};

export default ButtonComp;