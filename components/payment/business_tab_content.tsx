import React from "react";
import ButtonComp from "../button_comp";
import BarChart from "@/pages/bar";
import SliderComp from "../sliderComp";

type Props = {};

const BusinessTabContent = (props: Props) => {
  return (
    <div
      className="
    flex
    flex-col
    items-center
    max-w-[700px]/
    justify-center
    mx-auto
    py-12
    font-manrope
    "
    >
      <p
        className="
      font-manrope
      text-sm
      "
      >
        How much data will you store?
      </p>
      <form className="flex ml-[50px] mt-[5px] mb-[13px]" action="">
        <input
          className="
        border
        py-[5px]
        px-[16px]
        border-[#1890FF]
        rounded-sm
        max-w-[175px]
        "
          type="text"
        />
        <select
          className="
        text-[#1890FF]
        text-sm
        "
          name="unit"
          id="unit"
        >
          <option value="GB">GB</option>
          <option value="TB">TB</option>
        </select>
      </form>
      <p
        className="
       font-manrope
       text-sm
       mb-2
       "
      >
        What percentage of your data will you transfer or download (data
        transfer - egress)?{" "}
      </p>
      <SliderComp />
      <p
        className="
       font-manrope
       text-sm
       my-[13px]
       "
      >
        By using AFILENAME you could save:{" "}
        <span className="font-[500]">$55,000.00 a month!</span>
      </p>
      <ButtonComp className="my-0 w-[144px]" text="Get Started" />
      <BarChart />
    </div>
  );
};

export default BusinessTabContent;
