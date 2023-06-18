import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
// ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Cookies from "js-cookie";
import DarkLightIcon from "@/components/dark_light_icon";

const EmailAndTheme = ({ position }: { position?: string }) => {
  const [email, setEmail] = useState<string>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setEmail(Cookies.get("email")?.split("@")[0] || "email");
  }, []);

  return (
    <div className={`flex ${position} top-8 right-24 md:right-8 sm:right-4`}>
      <div className="pl-4 md:pl-2 sm:pl-1 flex gap-4 md:gap-1 sm:gap-0 items-center">
        <div>
          <p className="text-[#2E3271]  dark:text-[#5073d2] text-base sm:text-xs font-semibold">
            {email}
          </p>
          <p className="font-manrope text-[#7c8db5b8] text-xs sm:text-[10px]">
            Premium
          </p>
        </div>
        <p>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event: any) => {
              setAnchorEl(event.currentTarget);
            }}
            className="w-fit min-w-0"
          >
            <KeyboardArrowDownIcon className="text-lg my-auto h-fit dark:text-white" />
          </Button>
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
        </p>
      </div>
      <DarkLightIcon />
    </div>
  );
};

export default EmailAndTheme;
