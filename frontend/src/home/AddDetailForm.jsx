import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImSpinner2 } from "react-icons/im";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddDetailForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const user = useRecoilValue(userState);
  const [showAddDetailsDialog, setShowAddDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneno: "",
    gender: "",
    dateofbirth: "",
    collegename: "",
    university: "",
    academicyear: "",
    address: "",
    techstack: [],
  });
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    if (user && isDetailsIncomplete(user)) {
      setShowAddDetailsDialog(true);
    }
  }, [user]);

  useEffect(() => {
    setIsFormValid(
      !Object.values(formData).some((value) =>
        Array.isArray(value) ? value.length === 0 : !value
      ) && formData.phoneno.length === 10
    );
  }, [formData]);

  const isDetailsIncomplete = (user) => {
    return Object.values({
      phoneno: user.phoneno,
      gender: user.gender,
      dateofbirth: user.dateofbirth,
      collegename: user.collegename,
      university: user.university,
      academicyear: user.academicyear,
      address: user.address,
      techstack: user.techstack,
    }).some((value) => !value);
  };

  const handleAddTech = () => {
    if (newTech.trim() && !formData.techstack.includes(newTech)) {
      setFormData({ ...formData, techstack: [...formData.techstack, newTech] });
      setNewTech("");
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      techstack: formData.techstack.filter((item) => item !== tech),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isFormValid) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/adduserdetail`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data?.user));
        toast.success("Details added successfully!");
      }
      setShowAddDetailsDialog(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add details. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog
        open={showAddDetailsDialog}
        onOpenChange={() => {}}
        closeOnEsc={false}
        closeOnOutsideClick={false}
      >
        <DialogContent
          className="max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg border overflow-y-auto max-h-[90vh]"
          style={{
            borderColor: `var(--borderColor)`,
            backgroundColor: `var(--background-color)`,
            scrollY: "auto",
          }}
        >
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Complete Your Profile
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Please fill out all required fields to continue with careerinsight
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phoneno" className="font-medium">
                  Phone Number
                </Label>
                <div className="flex items-center space-x-2">
                  <div
                    className="flex items-center space-x-2 px-3 py-2 border rounded-md"
                    style={{ borderColor: `var(--borderColor)` }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt="India Flag"
                      className="w-6 h-4 rounded-sm"
                    />
                    <span className="font-medium">+91</span>
                  </div>
                  <Input
                    id="phoneno"
                    name="phoneno"
                    placeholder="Enter your phone number"
                    value={formData.phoneno || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        handleChange({ target: { name: "phoneno", value } });
                      }
                    }}
                    className="inputField flex-1"
                    type="number"
                    maxLength="10"
                  />
                </div>
                {formData.phoneno && formData.phoneno.length < 10 && (
                  <p className="text-red-500 text-sm font-semibold">
                    Phone number must be 10 digits
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="gender" className="font-medium">
                  Gender
                </Label>

                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "gender", value } })
                  }
                  id="gender"
                  name="gender"
                >
                  <SelectTrigger className="inputField">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>

                  <SelectContent
                    style={{
                      backgroundColor: `var(--background-color)`,
                      color: `var(--text-color)`,
                      borderColor: `var(--borderColor)`,
                    }}
                  >
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Not to say">Not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="dateofbirth" className="font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="dateofbirth"
                  name="dateofbirth"
                  onChange={handleChange}
                  className="inputField"
                  type="date"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="collegename" className="font-medium">
                  College Name
                </Label>
                <Input
                  id="collegename"
                  name="collegename"
                  placeholder="Enter your college name"
                  onChange={handleChange}
                  className="inputField"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="university" className="font-medium">
                  University
                </Label>
                <Input
                  id="university"
                  name="university"
                  placeholder="Enter your university"
                  onChange={handleChange}
                  className="inputField"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="academicyear" className="font-medium">
                  Academic Year
                </Label>
                <Input
                  id="academicyear"
                  name="academicyear"
                  placeholder="Enter your academic year"
                  onChange={handleChange}
                  className="inputField"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="address" className="font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  className="inputField"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="techstack" className="font-medium">
                  Tech Stack
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="newTech"
                    name="newTech"
                    placeholder="Add a technology"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="inputField"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTech}
                    disabled={!newTech.trim()}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techstack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                      <button
                        type="button"
                        className="ml-1"
                        onClick={() => handleRemoveTech(tech)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-center">
              <Button
                type="button"
                onClick={handleSaveDetails}
                disabled={!isFormValid || loading}
                className="px-6 py-3 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex flex-row gap-2 items-center">
                    <ImSpinner2 size={20} className="animate-spin" /> Saving
                    your details
                  </div>
                ) : (
                  "Save Details"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDetailForm;
