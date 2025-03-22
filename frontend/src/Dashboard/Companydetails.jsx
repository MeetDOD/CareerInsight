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
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";

// const companiesData = [
//   {
//     id: 1,
//     name: "Tata Consultancy Services",
//     logo: tcs,
//     Role: ["Ninja", "Digital", "Prime"],
//     rounds: ["Aptitude test-(TCS ION Center)", "Technical Interview"],
//     preparationTips: [
//       "Aptitude round contain logical,quantitative,coding question ",
//       "Practice Basic programming",
//       "Be thorough with your resume",
//       "Be aware of OOPS concept",
//     ],
//     references: [
//       "https://www.youtube.com/playlist?list=PL3JmT-xgOMNzI0gM52dReLwXMah1Ma6nl",
//       "https://www.geeksforgeeks.org/tcs-placement-preparation/",
//     ],
//   },
//   {
//     id: 2,
//     name: "Content Stack",
//     logo: contentstackimage,
//     rounds: [
//       "Online Test from College",
//       "Technical Interview 1",
//       "Manager Interview 2",
//       "HR Interview",
//     ],
//     preparationTips: [
//       "Maintain an aggregate CGPA of 8.5",
//       "Focus on Data Structures and Algorithms",
//       "Practice html css concepts",
//       "Basic Concepts and fundamentals of javascript",
//       "Well versed with Fullstack development",
//       "Should know MySQL concept",
//       "Online test include 1 DSA question and 1 SQL query",
//     ],
//     references: [
//       "https://neetcode.io/practice",
//       "https://sqlzoo.net/wiki/SQL_Tutorial",
//       "https://www.geeksforgeeks.org/javascript/",
//     ],
//   },
//   {
//     id: 3,
//     name: "Infosys",
//     logo: infosys,
//     Role: ["Specialist Programmer"],
//     rounds: ["Coding Round", "Interview"],
//     preparationTips: [
//       "Prepare for aptitude tests",
//       "Focus on Data Structures and Algorithms",
//       "Be thorough with SQL and databases",
//       "Study system design",
//       "Prepare for behavioral and leadership questions",
//       "Be aware of OOPS concept",
//     ],
//     references: [
//       "https://neetcode.io/practice",
//       "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
//     ],
//   },
//   {
//     id: 4,
//     name: "Bristlecone",
//     logo: bristlecome,
//     Role: ["Associate"],
//     rounds: [
//       "Online Test",
//       "Group Discussion-1",
//       "Group Discussion-2",
//       "Technical Interview",
//     ],
//     preparationTips: [
//       "Basic Aptitude",
//       "Communication Skills",
//       "Be thorough with your resume",
//       "Be confident in behavioral questions",
//     ],
//     references: [
//       "https://www.youtube.com/watch?v=8SyZWgzLQSo",
//       "https://www.geeksforgeeks.org/aptitude-for-placements/",
//     ],
//   },
//   {
//     id: 5,
//     name: "Zeus Learning",
//     logo: zeus,
//     Role: [
//       "Developer",
//       "Quality Assurance",
//       "Visual Designer",
//       "Inspectional Designer",
//     ],
//     rounds: [
//       "Online Test",
//       "Paper pen Test",
//       "Technical Interview-1",
//       "Technical Interview-2",
//       "HR Round",
//     ],
//     preparationTips: [
//       "Basic Aptitude",
//       "Coding question for Developer",
//       "Logical puzzle and Testcase write for QA ",
//       "Analysis of Design for Visual and Inspectional",
//       "Communication Skills",
//       "Be thorough with your resume",
//       "Be confident in behavioral questions",
//       "Expect tricky Logical question",
//     ],
//     references: [
//       "https://www.youtube.com/watch?v=8SyZWgzLQSo",
//       "https://www.geeksforgeeks.org/aptitude-for-placements/",
//     ],
//   },
// ];

const CompanyVisits = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    logo: "",
    Role: [],
    rounds: [],
    preparationTips: [],
    references: [],
  });
  const [newRole, setNewRole] = useState("");
  const [newRound, setNewRound] = useState("");
  const [newTip, setNewTip] = useState("");
  const [newReference, setNewReference] = useState("");
  const [companiesData, setCompaniesData] = useState([]);

  const user = useRecoilValue(userState);
  console.log(user);

  const handleaddcompany = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", newCompany.name);
    formdata.append("logo", newCompany.logo);
    formdata.append("Role", newCompany.Role);
    formdata.append("rounds", newCompany.rounds);
    formdata.append("preparationTips", newCompany.preparationTips);
    formdata.append("references", newCompany.references);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/createcompanydetails`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Company added successfully");
    } catch (error) {
      toast.error("Failed to add company");
    }
  };

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newCompany);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CAREERINSIGHT | COMPANY VISITS`;
  }, []);

  useEffect(() => {
    const fetchcompany = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getcompanydetails`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompaniesData(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Failed to fetch companies data");
      } finally {
      }
    };
    fetchcompany();
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Company</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  className="inputField"
                  value={newCompany.name}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  className="inputField"
                  value={newCompany.logo}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, logo: e.target.value })
                  }
                  type="url"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="flex gap-2">
                  <Input
                    value={newRole}
                    className="inputField"
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Add a role (e.g., Ninja, Digital)"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newRole.trim()) {
                        setNewCompany({
                          ...newCompany,
                          Role: [...newCompany.Role, newRole.trim()],
                        });
                        setNewRole("");
                      }
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.Role.map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-secondary p-2 rounded-md"
                    >
                      <span>{role}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            Role: newCompany.Role.filter((_, i) => i !== index),
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interview Rounds</Label>
                <div className="flex gap-2">
                  <Input
                    value={newRound}
                    className="inputField"
                    onChange={(e) => setNewRound(e.target.value)}
                    placeholder="Add an interview round"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newRound.trim()) {
                        setNewCompany({
                          ...newCompany,
                          rounds: [...newCompany.rounds, newRound.trim()],
                        });
                        setNewRound("");
                      }
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {newCompany.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary p-2 rounded-md"
                    >
                      <span>{round}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            rounds: newCompany.rounds.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preparation Tips</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTip}
                    className="inputField"
                    onChange={(e) => setNewTip(e.target.value)}
                    placeholder="Add a preparation tip"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newTip.trim()) {
                        setNewCompany({
                          ...newCompany,
                          preparationTips: [
                            ...newCompany.preparationTips,
                            newTip.trim(),
                          ],
                        });
                        setNewTip("");
                      }
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {newCompany.preparationTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary p-2 rounded-md"
                    >
                      <span>{tip}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            preparationTips: newCompany.preparationTips.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>References</Label>
                <div className="flex gap-2">
                  <Input
                    value={newReference}
                    className="inputField"
                    onChange={(e) => setNewReference(e.target.value)}
                    placeholder="Add a reference URL"
                    type="url"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newReference.trim()) {
                        setNewCompany({
                          ...newCompany,
                          references: [
                            ...newCompany.references,
                            newReference.trim(),
                          ],
                        });
                        setNewReference("");
                      }
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {newCompany.references.map((ref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-secondary p-2 rounded-md"
                    >
                      <span className="truncate">{ref}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            references: newCompany.references.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button onClick={handleaddcompany} type="submit">
                  Add Company
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent
            style={{
              backgroundColor: `var(--background-color)`,
              borderColor: `var(--borderColor)`,
            }}
            className="max-w-3xl w-full overflow-y-auto p-6 rounded-lg shadow-lg border"
          >
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
                <Button className="w-full" onClick={() => openModal(company)}>
                  <FaInfoCircle /> More Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CompanyVisits;
