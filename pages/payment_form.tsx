import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import Image from "next/image";
import { Box, CssBaseline } from "@mui/material";
import DrawerComp from "@/components/responsive_drawer";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ButtonComp from "@/components/button_comp";

const PaymentForm = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div className="w-[240px] sm:w-[200px] xs:w-[0px]">
        <DrawerComp
        // folders={"folders"}
        // handleFileChangeFunction={"handleFileChangeFunction"}
        // createFolder={() => "createFolder(newFolderName)"}
        // handleFolderChangeFunction={"handleFolderChangeFunction"}
        // allFiles={"files"}
        />
      </div>
      <section
        className="
    flex
    flex-col
    items-center
    justify-center
    py-12
    font-manrope
    text-[#242634]
    w-full/
    w-[calc(100%-240px)]/
    sm:w-[calc(100%-200px)]/
    xs:w-full
    pl-[3.5%] 
    pr-[2%]
    mt-[1%]
    sm:mt-[25px]
    w-[500px]
    sm:w-full
    mx-auto
    "
      >
        <div
          className="
        flex
        items-center
        font-bold
        "
        >
          <LockIcon />
          <h1>Add your card</h1>
        </div>
        <p>Your information is secured by Stripe. </p>
        <div className="w-[100%]/">
          <form
            action=""
            className="
        w-[100%]/
   
        "
          >
            <p
              className="
              text-[#697386]
              text-sm
              mt-8
              mb-2
              "
            >
              Country or region
            </p>
            <div
              className="
              relative
              "
            >
              <input
                className="
                border
                border-[#3c42571f]
                rounded-t-[8px]
                text-[#8792A2]
                px-2
                py-1
                w-full
                shadow-sm
                "
                type="number"
                placeholder="1234 1234 1234 1234"
              />
              <Image
                className="
                absolute
                top-0
                right-0
                bottom-0
                w-32
                mx-2
                my-1
                "
                src={require("../images/credit_cards.png")}
                alt="credit cards"
              />
            </div>
            <div
              className="
            flex
            "
            >
              <input
                className="
                border
                border-[#3c42571f]
                rounded-bl-[8px]
                text-[#8792A2]
                px-2
                py-1
                w-full
                flex-1
                shadow-sm
                "
                type="text"
                placeholder="MM / YY"
              />
              <div
                className="
                relative
                flex-1
                "
              >
                <input
                  className="
                border
                border-[#3c42571f]
                rounded-br-[8px]
                text-[#8792A2]
                px-2
                py-1
                w-full
                shadow-sm
                "
                  type="number"
                  placeholder="CVC"
                />
                <Image
                  className="
                w-12
                absolute
                top-0
                right-0
                "
                  src={require("../images/cvc.png")}
                  alt="cvc"
                />
              </div>
            </div>
            <p
              className="
              text-[#697386]
              text-sm
              mt-8
              mb-2
              "
            >
              Name on card
            </p>
            <input
              className="
                border
                border-[#3c42571f]
                rounded-[8px]
                text-[#8792A2]
                px-2
                py-1
                w-full
                shadow-sm
                "
              type="text"
              placeholder=""
            />
            <p
              className="
              text-[#697386]
              text-sm
              mt-8
              mb-2
              "
            >
              Country or region
            </p>
            <div
              className="
           border
           border-[#3c42571f]
           rounded-t-[8px]
           text-[#8792A2]
           px-1
           py-1
           w-full
           shadow-sm
           flex
           items-center
           text-[#1A1F36]
           justify-between/
           "
            >
              <select
                className="
              w-full
              text-[#1890FF]/
              text-sm/
              "
                name="country"
                id="country"
              >
                <option value="United States">United States</option>
                <option value="">No more countries</option>
              </select>
            </div>
            <input
              className="
                border
                border-[#3c42571f]
                rounded-b-[8px]
                text-[#8792A2]
                px-2
                py-1
                w-full
                shadow-sm
                "
              type="number"
              placeholder="ZIP"
            />
          </form>
          <div
            className="
           border
           border-[#3c42571f]
           rounded-[8px]
           text-[#8792A2]
           px-2
           py-3
           w-full
           shadow-sm
           flex
           flex-col
           gap-2
           items-center/
           text-[#1A1F36]
           justify-between/
           mt-[25px]
           "
          >
            <p className="text-14 sm:text-xs text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] flex items-center gap-[6px]">
              <CheckBoxIcon
                style={{
                  color: "#1890FF",
                }}
                className="text-base text-blue-500 !important"
              />
              I need to protect my API key and alert support@afilename.com if it
              maybe an insecure API key.
            </p>
            <p className="text-14 sm:text-xs text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] flex items-center gap-[6px]">
              <CheckBoxIcon
                style={{
                  color: "#1890FF",
                }}
                className="text-base text-blue-500 !important"
              />
              My Free Trial ends in one month and I will be billed starting on
              June 1, 2023. If I want to cancel I can do so by contacting
              support@afilename.com or handling it on the dashboard. I also can
              claim a money-back guarantee within 30 days of my free trial by
              reaching out to support for any reason.
            </p>
            <p className="text-14 sm:text-xs text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] flex items-center gap-[6px]">
              <CheckBoxIcon
                style={{
                  color: "#1890FF",
                }}
                className="text-base text-blue-500 !important"
              />
              I agree to the Terms of Service and Privacy agreements.
            </p>
          </div>
        </div>
        <ButtonComp className="max-w-[155px] mx-auto/ my-0" text="Start Now" />
      </section>
    </Box>
  );
};

export default PaymentForm;
