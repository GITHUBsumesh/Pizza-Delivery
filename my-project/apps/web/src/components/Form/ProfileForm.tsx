import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProfileFormProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: string;
  };
  selectedImg: string | null;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setPhoneNumber: (number: string) => void;
  setAddress: (address: string) => void;
  phoneNumber: string;
  address: string;
  firstName: string;
  lastName: string;
  handleUpdateProfile: (e: React.FormEvent) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  selectedImg,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setAddress,
  phoneNumber,
  address,
  firstName,
  lastName,
  handleUpdateProfile,
  handleImageUpload,
  isPending,
}) => {
  return (
    <form
      onSubmit={handleUpdateProfile}
      className="w-[50vw] h-screen flex flex-col text-[#a9a9a9] gap-2 justify-center"
    >
      <Link href={"/user"}>
        <div className="top flex flex-row">
          <ArrowLeft />
          <p>Back To Home</p>
        </div>
      </Link>
      <h1 className="font-bold text-[1.6rem]">Profile</h1>
      <hr />
      <div className="contact_info flex flex-col gap-3">
        <div className="ProfilePic flex flex-col">
          <div className="profile_picture flex flex-col justify-center items-center gap-2">
            <Avatar className="w-48 h-48 border-[0.25rem] border-white">
              <AvatarImage
                src={selectedImg || profile.profilePic || "/avatar.png"}
                alt="Profile"
              />
              <AvatarFallback>{profile.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute translate-x-[4rem] translate-y-[4rem]">
              <Label className="bg-yellow-300 rounded-full w-8 h-8 flex items-center justify-center">
                <Camera className="text-black" />
                <Input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isPending}
                />
              </Label>
            </div>
            <h2 className="text-sm text-muted-foreground">
              {isPending
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </h2>
          </div>
        </div>

        <div className="Name flex flex-col gap-4">
          <div className="space-y-1 flex-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="authcss w-[50%]"
              required
            />
          </div>
          <div className="space-y-1 flex-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="authcss w-[50%]"
              required
            />
          </div>
        </div>

        <div className="contact_info flex flex-col gap-4">
          <div className="space-y-1 flex-1">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91"
              className="authcss w-[50%]"
              required
            />
          </div>
          <div className="space-y-1 flex-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              placeholder="Email"
              className="authcss w-[50%]"
              required
              disabled
            />
          </div>
        </div>

        <div className="delivery flex flex-col gap-3">
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your Address"
              className="authcss"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <Button className="yellow" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
