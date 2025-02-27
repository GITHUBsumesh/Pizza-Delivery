"use client";
import ProfileForm from "@/components/Form/ProfileForm";
import { useProfile, useUpdateProfile } from "@/hooks/useAuth";
import React, { useState } from "react";

const Page = () => {
  const { data: profile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phoneNumber, setPhoneNumber] = useState<string>(profile.phoneNumber);
  const [address, setAddress] = useState(profile.address);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  // let image: string | null = null;
  const { mutate, isPending } = useUpdateProfile();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        setSelectedImg(base64Image);
      }
    };
  };
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      profilePic: selectedImg || undefined,
      firstName,
      lastName,
      phoneNumber,
      address,
    });
  };
  return (
    <div className="w-full h-[calc(100vh-3rem)] relative overflow-x-hidden overflow-y-auto flex flex-row center ">
      <div className="h-full w-full flex flex-col items-center py-5 ">
        <ProfileForm
          profile={profile}
          selectedImg={selectedImg}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhoneNumber={setPhoneNumber}
          setAddress={setAddress}
          phoneNumber={phoneNumber}
          address={address}
          firstName={firstName}
          lastName={lastName}
          handleUpdateProfile={handleUpdateProfile}
          handleImageUpload={handleImageUpload}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default Page;
