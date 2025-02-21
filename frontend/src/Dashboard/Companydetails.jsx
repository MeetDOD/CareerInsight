import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "./AppSidebar";
import { FaInfoCircle } from "react-icons/fa";
import contentstackimage from "../assets/contentstackimage.jpg";
import infosys from "../assets/infosys.jpg";
import tcs from "../assets/TCS.jpg";
import bristlecome from "../assets/bristlecome.jpg";
import zeus from "../assets/zeus.jpg";

const companiesData = [
  {
    id: 1,
    name: "Tata Consultancy Services",
    logo: tcs,
    Role: ["Ninja", "Digital", "Prime"],
    rounds: ["Aptitude test-(TCS ION Center)", "Technical Interview"],
    preparationTips: [
      "Aptitude round contain logical,quantitative,coding question ",
      "Practice Basic programming",
      "Be thorough with your resume",
      "Be aware of OOPS concept",
    ],
    references: [
      "https://www.youtube.com/playlist?list=PL3JmT-xgOMNzI0gM52dReLwXMah1Ma6nl",
      "https://www.geeksforgeeks.org/tcs-placement-preparation/",
    ],
  },
  {
    id: 2,
    name: "Content Stack",
    logo: contentstackimage,
    rounds: [
      "Online Test from College",
      "Technical Interview 1",
      "Manager Interview 2",
      "HR Interview",
    ],
    preparationTips: [
      "Maintain an aggregate CGPA of 8.5",
      "Focus on Data Structures and Algorithms",
      "Practice html css concepts",
      "Basic Concepts and fundamentals of javascript",
      "Well versed with Fullstack development",
      "Should know MySQL concept",
      "Online test include 1 DSA question and 1 SQL query",
    ],
    references: [
      "https://neetcode.io/practice",
      "https://sqlzoo.net/wiki/SQL_Tutorial",
      "https://www.geeksforgeeks.org/javascript/",
    ],
  },
  {
    id: 3,
    name: "Infosys",
    logo: infosys,
    Role: ["Specialist Programmer"],
    rounds: ["Coding Round", "Interview"],
    preparationTips: [
      "Prepare for aptitude tests",
      "Focus on Data Structures and Algorithms",
      "Be thorough with SQL and databases",
      "Study system design",
      "Prepare for behavioral and leadership questions",
      "Be aware of OOPS concept",
    ],
    references: [
      "https://neetcode.io/practice",
      "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    ],
  },
  {
    id: 4,
    name: "Bristlecone",
    logo: bristlecome,
    Role: ["Associate"],
    rounds: [
      "Online Test",
      "Group Discussion-1",
      "Group Discussion-2",
      "Technical Interview",
    ],
    preparationTips: [
      "Basic Aptitude",
      "Communication Skills",
      "Be thorough with your resume",
      "Be confident in behavioral questions",
    ],
    references: [
      "https://www.youtube.com/watch?v=8SyZWgzLQSo",
      "https://www.geeksforgeeks.org/aptitude-for-placements/",
    ],
  },
  {
    id: 5,
    name: "Zeus Learning",
    logo: zeus,
    Role: [
      "Developer",
      "Quality Assurance",
      "Visual Designer",
      "Inspectional Designer",
    ],
    rounds: [
      "Online Test",
      "Paper pen Test",
      "Technical Interview-1",
      "Technical Interview-2",
      "HR Round",
    ],
    preparationTips: [
      "Basic Aptitude",
      "Coding question for Developer",
      "Logical puzzle and Testcase write for QA ",
      "Analysis of Design for Visual and Inspectional",
      "Communication Skills",
      "Be thorough with your resume",
      "Be confident in behavioral questions",
      "Expect tricky Logical question",
    ],
    references: [
      "https://www.youtube.com/watch?v=8SyZWgzLQSo",
      "https://www.geeksforgeeks.org/aptitude-for-placements/",
    ],
  },
];

const CompanyVisits = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CAREERINSIGHT | COMPANY VISITS`;
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
        <div className="flex items-center gap-2 mb-4">
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
                  Company Visits
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companiesData.map((company) => (
            <div
              key={company.id}
              className="p-4 border shadow-md rounded-lg transition duration-300 hover:-translate-y-2 space-y-3"
              style={{ borderColor: `var(--borderColor)` }}
            >
              <div className="flex flex-col items-center ">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-1/2 rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold">{company.name}</h3>
              </div>

              <div>
                <Button
                  className="w-full"
                  onClick={() => openModal(company)}
                >
                  <FaInfoCircle /> More Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={isModalOpen}
          onOpenChange={closeModal}
        >
          <DialogContent style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }} className="max-w-3xl w-full overflow-y-auto p-6 rounded-lg shadow-lg border">
            {selectedCompany && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    {selectedCompany.name} - Interview Details
                  </DialogTitle>
                  <DialogDescription>
                    Important details about the company interview process.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Interview Rounds</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.rounds.map((round, index) => (
                        <li key={index}>{round}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Preparation Tips</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.preparationTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">References</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.references.map((ref, index) => (
                        <li key={index}>
                          <a
                            href={ref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {ref}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <DialogFooter className="sticky bottom-0 text-gray-800">
                  <Button variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CompanyVisits;
