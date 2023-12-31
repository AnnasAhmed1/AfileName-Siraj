import React, { useEffect, useState } from "react";
import {
  handleDeleteAction,
  handleFetchAction,
  handleInsertAction,
} from "@/config/API_actions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import DrawerComp from "@/components/responsive_drawer";
import Image from "next/image";
import FileList from "@/components/file_list";

// ICONS
import { toast } from "react-toastify";
import FileUpload from "@/components/file_upload";
import EmailAndTheme from "@/components/email_and_theme";

interface MyObject {
  name: string;
  _id: string;
}
interface FileObject {
  title: string;
  contentType: string;
  dateUploaded: any;
  fileId: any;
}

export default function Dashboard() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [filesDetails, setFilesDetails] = useState<Array<any>>([]);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState<Array<any>>([]);

  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : (getFolders(), getFiles());
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

  const getSingleFileDetails = async (fileId?: any) => {
    await handleFetchAction(`files/${fileId}`).then(async () => {
      await handleFetchAction(`files/${fileId}`).then((res: any) => {
        const data = res.data;
        filesDetails.push(data);
        setFilesDetails([...filesDetails]);
      });
    });
  };

  const getFolders = async () => {
    handleFetchAction("/account/folders").then((response: any) => {
      setFolders(response.data.folders);
    });
  };

  return (
    <div style={{ display: "flex" }} className="font-karla">
      <div className="w-[240px]  sm:w-[200px] xs:w-[0px]">
        <DrawerComp
          folders={folders}
          handleFileChangeFunction={handleFileChangeFunction}
          createFolder={() => createFolder(newFolderName)}
          handleFolderChangeFunction={handleFolderChangeFunction}
          allFiles={files}
        />
      </div>
      <div
        className="
          w-[calc(100%-240px)]
          sm:w-[calc(100%-200px)]
          xs:w-full
          pl-[3.5%] 
          pr-[2%]
          mt-[5%]
          sm:mt-[25px]
        "
      >
        <section
          className="flex 
            justify-between
            items-center 
            pr-[10%]
            md:pr-0
            sm:pr-0
            "
        >
          <input
            type="text"
            className="
              xs:ml-10
              w-[60%]
              sm:w-full
              mx-auto
              border
              border-black
              py-0 
              dark:border-white
              px-4
              h-8
             "
            placeholder="search"
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              await handleFetchAction(
                `/account/search?q=${e.target.value}`
              ).then((response: any) => {
                getFilesDetails(response.data.fileIds);
              });
            }}
          />

          <EmailAndTheme />
        </section>
        {searchQuery.length == 0 ? (
          <>
            <section
              className="
                pl-[3%]
                mb-8
                border-b-[0.25px]
                pt-[5%]
                pb-[5%]
                border-black
                dark:border-white
              "
            >
              <h1
                className="
                  tracking-[1px]
                  font-bold
                  text-xl
                  text-[#2E2E2E]
                  dark:text-[#ffffff]
                  my-4
                "
              >
                Folders
              </h1>

              <div
                className="
                    flex
                    gap-6
                    md:gap-4
                    overflow-x-scroll
                    scrollbar-thin
                    scroll-m-0
                    scroll-p-0
                  "
              >
                {folders?.length == 0 ? (
                  <p className="my-4">No folders yet</p>
                ) : (
                  folders?.map((v, i) => {
                    const obj = v as MyObject;
                    return (
                      <div
                        key={i}
                        className="border-2
                          border-[rgba(0,0,0,0.06)]
                          dark:border-[rgba(255,255,255,0.9)]
                          container
                          cursor-pointer
                          rounded-lg
                          min-w-[150px]
                          w-[150px]
                          h-[185px]
                          md:min-w-[120px]
                          md:w-[120px]
                          md:h-[145px]
                          md:pt-[25px]
                          md:pb-[10px]
                          sm:min-w-[120px]
                          sm:w-[120px]
                          sm:h-[145px]
                          sm:pt-[25px]
                          sm:pb-[10px]
                          pt-[35px]
                          pb-[20px]
                          "
                        onClick={() => {
                          router.push({
                            pathname: "/folder",
                            query: { id: obj._id, name: obj.name },
                          });
                        }}
                      >
                        <Image
                          src={require("../images/folder_icon.svg")}
                          alt="folder icon"
                          className="w-[100px] md:w-[80px] mx-auto"
                        />
                        <p
                          className="
                            font-inter
                            text-[18px]
                            md:text-base
                            font-semibold
                            text-[#1A1A1A]
                            dark:text-[#ffffff]
                            mt-[10px]
                            px-[10px]
                            text-center
                            mx-6/
                            leading-[18px]
                            tracking-[0.01em]
                            break-all
                          "
                        >
                          {obj.name}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
            <section className="">
              <h1
                className="
                  font-bold
                  text-xl
                  text-[#2E2E2E]
                  dark:text-[#ffffff]
                  tracking-[1px]
                  my-4
                  pl-[1.5%]
                "
              >
                Files
              </h1>
              {filesDetails.length == 0 ? (
                <p className="my-4">No files yet</p>
              ) : (
                filesDetails.map((v, i) => {
                  const fileObj = v as FileObject;
                  return <FileList key={i} fileObj={fileObj} />;
                })
              )}
            </section>
            {uploadingFiles?.length > 0 ? (
              <main className="w-[295px] px-3 py-2 bottom-2 right-4 fixed max-h-[308px] overflow-scroll scrollbar-thin bg-white dark:bg-[#3C4048] border-2 border-gray-100 dark:border-gray-900 rounded-md ">
                <h1
                  className={`
                    text-[18px]
                    font-bold
                    text-[#1A1A1A]
                    dark:text-[#ffffff]
                    text-center
                  `}
                >
                  {`Uploading ${uploadingFiles?.length} Files...`}
                </h1>

                {uploadingFiles.map((file, index) => (
                  <FileUpload
                    key={index}
                    file={file}
                    onFinishUpload={(fileId: string) => {
                      setUploadingFiles((prevState) =>
                        prevState.filter((_, i) => i !== index)
                      );
                      getSingleFileDetails(fileId);
                    }}
                    onCancelRequest={(fileId?: string) => {
                      handleDeleteAction(`files/delete?fileId=${fileId}`);
                      setUploadingFiles((prevState) =>
                        prevState.filter((_, i) => i !== index)
                      );
                      toast.error("File upload cancelled", {
                        position: "top-center",
                      });
                    }}
                  />
                ))}
              </main>
            ) : null}
          </>
        ) : (
          <section className="">
            <h1
              className="
                font-bold
                text-xl
                text-[#2E2E2E]
                dark:text-[#ffffff]
                tracking-[1px]
                my-4
                pl-[1.5%]
              "
            >
              Files
            </h1>
            {filesDetails.length == 0 ? (
              <p className="my-4">No files yet</p>
            ) : (
              filesDetails.map((v, i) => {
                const fileObj = v as FileObject;
                return <FileList key={i} fileObj={fileObj} />;
              })
            )}
          </section>
        )}
      </div>
    </div>
  );
}
