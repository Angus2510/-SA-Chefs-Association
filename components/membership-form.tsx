import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MembershipDetails {
  name: string;
  idNumber: string;
  membershipNumber: string;
  membershipCategory: string;
  email: string;
  region: string;
}

interface MembershipFormProps {
  membershipDetails: MembershipDetails;
  setMembershipDetails: (
    details:
      | MembershipDetails
      | ((prev: MembershipDetails) => MembershipDetails)
  ) => void;
}

export default function MembershipForm({
  membershipDetails,
  setMembershipDetails,
}: MembershipFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setMembershipDetails((prev: MembershipDetails) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
    } else if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please enter a valid email address",
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Voting Registration</CardTitle>
        <CardDescription>
          Please fill in your membership details below. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center">
            Name and Surname <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={membershipDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={(e) => validateField("name", e.target.value)}
            className={errors.name ? "border-red-500" : ""}
            required
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber" className="flex items-center">
            ID Number <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="idNumber"
            placeholder="Enter your ID number"
            value={membershipDetails.idNumber}
            onChange={(e) => handleChange("idNumber", e.target.value)}
            onBlur={(e) => validateField("idNumber", e.target.value)}
            className={errors.idNumber ? "border-red-500" : ""}
            required
          />
          {errors.idNumber && (
            <p className="text-xs text-red-500">{errors.idNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipNumber" className="flex items-center">
            Membership Number{" "}
            <span className="text-gray-400 ml-1">(Optional)</span>
          </Label>
          <Input
            id="membershipNumber"
            placeholder="Enter your membership number (if applicable)"
            value={membershipDetails.membershipNumber}
            onChange={(e) => handleChange("membershipNumber", e.target.value)}
            className={errors.membershipNumber ? "border-red-500" : ""}
          />
          {errors.membershipNumber && (
            <p className="text-xs text-red-500">{errors.membershipNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            Membership Category <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={membershipDetails.membershipCategory}
            onValueChange={(value) => handleChange("membershipCategory", value)}
            className={
              errors.membershipCategory ? "border-red-500 rounded-md p-2" : ""
            }
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">Professional Member</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="foreign" id="foreign" />
              <Label htmlFor="foreign">
                Foreign Based, Professional Member
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate Member</Label>
            </div>
          </RadioGroup>
          {errors.membershipCategory && (
            <p className="text-xs text-red-500">{errors.membershipCategory}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center">
            Email Address <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={membershipDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => validateField("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            Region <span className="text-red-500 ml-1">*</span>
          </Label>
          <RadioGroup
            value={membershipDetails.region}
            onValueChange={(value) => handleChange("region", value)}
            className={errors.region ? "border-red-500 rounded-md p-2" : ""}
            required
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eastern-cape" id="eastern-cape" />
                <Label htmlFor="eastern-cape">Eastern Cape</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free-state" id="free-state" />
                <Label htmlFor="free-state">Free State</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gauteng" id="gauteng" />
                <Label htmlFor="gauteng">Gauteng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kzn" id="kzn" />
                <Label htmlFor="kzn">Kwa-Zulu Natal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limpopo" id="limpopo" />
                <Label htmlFor="limpopo">Limpopo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mpumalanga" id="mpumalanga" />
                <Label htmlFor="mpumalanga">Mpumalanga</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="northern-cape" id="northern-cape" />
                <Label htmlFor="northern-cape">Northern Cape</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="north-west" id="north-west" />
                <Label htmlFor="north-west">North West</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="western-cape" id="western-cape" />
                <Label htmlFor="western-cape">Western Cape</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </div>
          </RadioGroup>
          {errors.region && (
            <p className="text-xs text-red-500">{errors.region}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
