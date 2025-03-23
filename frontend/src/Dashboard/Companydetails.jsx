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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import { Sparkles } from "lucide-react";
import CompanyRoadmap from "./CompanyRoadmap";

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
  const [isRoadMapOpen, setIsRoadMapOpen] = useState(false);


  const user = useRecoilValue(userState);



  const handleOpenRoadMap = (company) => {
    setSelectedCompany(company);
    setIsRoadMapOpen(true);
  };


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
      toast.success("Company added successfully");
      closeModal();
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
          {user.role === "Admin" && (
            <DialogTrigger asChild>
              <Button className="mb-4 w-40" size="sm">
                Add New Company
              </Button>
            </DialogTrigger>
          )}
          <DialogContent className="max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg border overflow-y-auto max-h-[90vh]" style={{
            borderColor: `var(--borderColor)`,
            backgroundColor: `var(--background-color)`,
            scrollY: "auto",
          }}>
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  className="inputField"
                  placeholder="Enter company name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  className="inputField"
                  placeholder="Enter company logo URL"
                  value={newCompany.logo}
                  onChange={(e) => setNewCompany({ ...newCompany, logo: e.target.value })}
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
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.Role.map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {role}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            Role: newCompany.Role.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        <MdCancel />
                      </button>
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
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {round}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            rounds: newCompany.rounds.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <MdCancel />
                      </button>
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
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.preparationTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tip}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            preparationTips: newCompany.preparationTips.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <MdCancel />
                      </button>
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
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCompany.references.map((ref, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {ref}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => {
                          setNewCompany({
                            ...newCompany,
                            references: newCompany.references.filter(
                              (_, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <DialogTrigger asChild>
                  <Button variant="secondary">Cancel</Button>
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
                      {selectedCompany.Role && selectedCompany.Role.length >= 1 ? (
                        selectedCompany.Role[0].split(",").map((role, index) => (
                          <li key={index}>{role.trim()}</li>
                        ))
                      ) : (
                        <li>No roles found</li>
                      )}
                    </ul>
                  </div>


                  <div>
                    <h3 className="text-lg font-semibold">Interview Rounds</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.rounds && selectedCompany.rounds.length >= 1 ? (
                        selectedCompany.rounds[0].split(",").map((round, index) => (
                          <li key={index}>{round.trim()}</li>
                        ))
                      ) : (
                        <li>No round found</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Preparation Tips</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.preparationTips && selectedCompany.preparationTips.length >= 1 ? (
                        selectedCompany.preparationTips[0].split(",").map((tip, index) => (
                          <li key={index}>{tip.trim()}</li>
                        ))
                      ) : (
                        <li>No round found</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">References</h3>
                    <ul className="list-disc ml-6">
                      {selectedCompany.references && selectedCompany.references.length >= 1 ? (
                        selectedCompany.references[0].split(",").map((ref, index) => (
                          <li key={index}>
                            <a
                              href={ref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {ref.trim()}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>No round found</li>
                      )}
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
              <div className="flex flex-col items-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-1/2 rounded-lg object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold">{company.name}</h3>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={() => openModal(company)}>
                  <FaInfoCircle /> More Details
                </Button>
                <Button
                  className="w-full border"
                  variant="secondary"
                  onClick={() => handleOpenRoadMap(company)}
                >
                  <Sparkles /> Generate Road Map
                </Button>
              </div>
            </div>
          ))}

          {isRoadMapOpen && selectedCompany && (
            <CompanyRoadmap
              open={isRoadMapOpen}
              onClose={() => setIsRoadMapOpen(false)}
              singlecompany={selectedCompany}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CompanyVisits;
