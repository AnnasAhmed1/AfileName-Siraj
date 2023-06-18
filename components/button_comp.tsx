import React from "react";

const ButtonComp = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  console.log(className);
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
      w-[90%]/
      justify-center
      ${className}
       `}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
