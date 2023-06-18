import { Box, CssBaseline, Menu } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DrawerComp from "@/components/responsive_drawer";
import { MenuItem } from "@mui/base";

type TabbarProps = {
  personalPathname: boolean;
  businessPathname: boolean;
};

const TabSection: React.FC<TabbarProps> = ({
  personalPathname,
  businessPathname,
}) => {
  const router = useRouter();

  // move to personal tab
  const moveToPersonalTab = () => router.push("/payment/personal");
  // move to business tab
  const moveToBusinessTab = () => router.push("/payment/business");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  return (
    <section
      className={`flex items-center justify-center ${
        businessPathname && "flex-row-reverse"
      }`}
    >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          className:
            "dark:bg-[#252525]  dark:text-white text-[#545454] text-base font-medium",
        }}
      >
        <MenuItem>Logout</MenuItem>
      </Menu>
      <button
        className={`${
          personalPathname
            ? "text-primary border-primary border-r rounded-l-md"
            : "text-black border-secondary border-l rounded-r-md"
        } p-2 px-5 border-2 leading-5 font-semibold`}
        onClick={moveToPersonalTab}
      >
        Personal
      </button>
      <button
        className={`${
          businessPathname
            ? "text-primary border-primary border-r rounded-l-md"
            : "text-black border-secondary border-l rounded-r-md"
        } p-2 px-5 border-2  leading-5 font-semibold`}
        onClick={moveToBusinessTab}
      >
        Business
      </button>
    </section>
  );
};

export default TabSection;
