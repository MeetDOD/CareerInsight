import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import plugin from "grapesjs-tailwind";
import { Button } from "@/components/ui/button";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FaCopy, FaCheck } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PortfolioBuilder = () => {
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins: [plugin],
      height: "100vh",
    });

    setEditor(editor);
  }, []);

  const handleDeployPortfolio = async () => {
    const token = localStorage.getItem("token");
    if (!editor) return;

    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();

    const data = {
      html: htmlContent,
      css: cssContent,
      username: user?.fullName,
    };

    setLoading(true);

    try {
      const checktrail = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/user/checktrails/portfoliobuilder`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (checktrail.status === 200) {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/deployportfolio`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const url = `${import.meta.env.VITE_BASE_URL}${response.data.url}`;
          toast.success("Portfolio deployed successfully!");
          window.open(url, "_blank");
        } else {
          toast.error("Failed to deploy portfolio: " + response.data.message);
        }
      } else if (checktrail.status === 400) {
        toast.error(
          "You have exhausted your free trials. Please upgrade to premium to continue."
        );
        navigate("/pricing");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(
          "You have exhausted your free trials. Please upgrade to premium to continue."
        );
        navigate("/pricing");
      } else {
        console.error("Error deploying portfolio:", error);
        toast.error("There was an error deploying your portfolio.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BASE_URL}${user.portfolioUrl}`
    );
    setCopied(true);
    toast.success("Url copied to clipboard");
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CAREERINSIGHT | PORTFOLIO BUILDER`;
  }, []);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block font-semibold">
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className="font-semibold"
                    style={{ color: `var(--text-color)` }}
                  >
                    Portfolio Builder
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mt-5">
            <div id="editor"></div>
          </div>

          <div className="flex flex-col items-center justify-between space-x-2 mt-5 md:flex-row">
            <Button
              size="lg"
              disabled={loading}
              onClick={handleDeployPortfolio}
              className="text-sm border-2 border-primary"
            >
              {loading ? (
                <div className="flex flex-row gap-2 items-center">
                  <ImSpinner2 className="animate-spin" /> Deploying ...
                </div>
              ) : (
                "Deploy Portfolio"
              )}
            </Button>

            {user.portfolioUrl ? (
              <div className="flex flex-row items-center mt-2 md:mt-0 gap-2 px-4 p-1 bg-violet-100 border-primary border-2 border-dashed text-primary rounded-md">
                <div className="text-sm font-medium">
                  {`${import.meta.env.VITE_BASE_URL}${user.portfolioUrl}`}
                </div>
                <div
                  className="border-2 p-2 rounded-md border-primary cursor-pointer"
                  size="icon"
                  onClick={handleCopyUrl}
                >
                  {copied ? <FaCheck className="text-primary" /> : <FaCopy />}
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center mt-2 md:mt-0 gap-2 px-4 p-2 bg-violet-100 border-primary border-2 border-dashed text-primary rounded-md">
                <div className="text-sm font-medium">
                  You can see your url here after deploying your portfolio
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default PortfolioBuilder;
