import React, { useEffect, useState } from "react";
import BusinessTabContent from "@/components/payment/business_tab_content";
import PersonalTabContent from "@/components/payment/personal_tab_content";
import { useRouter } from "next/router";
import TabSection from "@/components/payment/tab_section";
import { Box, CssBaseline } from "@mui/material";
import DrawerComp from "@/components/responsive_drawer";
import EmailAndTheme from "@/components/email_and_theme";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleFetchAction, handleInsertAction } from "@/config/API_actions";

const BusinessPayment = () => {
  const { pathname } = useRouter();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [filesDetails, setFilesDetails] = useState<Array<any>>([]);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [uploadingFiles, setUploadingFiles] = useState<Array<any>>([]);

  const personalPathname = ["/payment/personal"].includes(pathname);
  const businessPathname = ["/payment/business"].includes(pathname);
  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : null;
  }, []);
  const handleFileChangeFunction = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file?.size == 0) {
      toast.error("cannot upload empty file", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    } else {
      if (file?.size / 1073741824 > 5) {
        toast.error("Connot upload file larger than 5 GB", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
    }
    uploadingFiles.push(file);
    setUploadingFiles([...uploadingFiles]);
  };
  const handleFolderChangeFunction = (e: any) => {
    setNewFolderName(e.target.value);
  };

  const createFolder = async (folderName: string) => {
    handleInsertAction("/folders/createfolder", {
      name: folderName,
    }).then(() => {
      getFolders();
    });
  };

  const getFiles = async () => {
    handleFetchAction("/account/files").then((res: any) => {
      const response = res.data.fileIds;
      setFiles(response);
      getFilesDetails(response);
    });
  };

  const getFilesDetails = async (
    _files?: any[],
    numItemsToLoad: number = 5
  ) => {
    let tempArr: any[] = [];
    let numItemsLoaded = 0;

    while (_files?.length && numItemsLoaded < _files.length) {
      const itemsToLoad = _files.slice(
        numItemsLoaded,
        numItemsLoaded + numItemsToLoad
      );

      await Promise.all(
        itemsToLoad.map(async (v: string, i: any) => {
          const res: any = await handleFetchAction(`files/${v}`);
          const data = res.data;
          tempArr.push(data);
        })
      );
      setFilesDetails([...tempArr]);
      numItemsLoaded += numItemsToLoad;
      // Wait for scroll event before loading the next set of items
      await new Promise((resolve) => {
        window.addEventListener("scroll", resolve, { once: true });
      });
    }
  };

  const getFolders = async () => {
    handleFetchAction("/account/folders").then((response: any) => {
      setFolders(response.data.folders);
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div className="w-[240px] sm:w-[200px] xs:w-[0px]">
        <DrawerComp
          folders={folders}
          handleFileChangeFunction={handleFileChangeFunction}
          createFolder={() => createFolder(newFolderName)}
          handleFolderChangeFunction={handleFolderChangeFunction}
          allFiles={files}
        />
      </div>
      <main
        className="md:p-20 p-24 w-[calc(100%-240px)]
        sm:w-[calc(100%-200px)]
        xs:w-full"
      >
        <EmailAndTheme position="absolute" />
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
