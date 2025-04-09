import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MembershipForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Voting Registration</CardTitle>
        <CardDescription>
          Please fill in your membership details below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipNumber">ID / Membership Number</Label>
          <Input
            id="membershipNumber"
            placeholder="Enter your ID or membership number"
          />
        </div>

        <div className="space-y-2">
          <Label>Membership Category</Label>
          <RadioGroup defaultValue="professional">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2">
          <Label>Region</Label>
          <RadioGroup defaultValue="gauteng">
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
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Registration</Button>
      </CardFooter>
    </Card>
  );
}
