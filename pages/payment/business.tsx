import BusinessTabContent from "@/components/payment/business_tab_content";
import PersonalTabContent from "@/components/payment/personal_tab_content";
import TabSection from "@/components/payment/tab_section";
import { Box, CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import DrawerComp from "@/components/responsive_drawer";

const BusinessPayment = () => {
  const { pathname } = useRouter();
  const personalPathname = ["/payment/personal"].includes(pathname);
  const businessPathname = ["/payment/business"].includes(pathname);
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
      <main
        className="md:p-20 p-5         w-[calc(100%-240px)]
    sm:w-[calc(100%-200px)]
    xs:w-full"
      >
        {/* Tab section */}
        <TabSection
          personalPathname={personalPathname}
          businessPathname={businessPathname}
        />
        {/* Tab Content Section */}
        <section className="">
          {/* Personal Tab Content */}
          {personalPathname && <PersonalTabContent />}
          {/* Business Tab Content */}
          {businessPathname && <BusinessTabContent />}
        </section>
      </main>
    </Box>
  );
};

export default BusinessPayment;
