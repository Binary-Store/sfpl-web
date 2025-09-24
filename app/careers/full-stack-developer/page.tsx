"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Upload } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/services/httpServices";

export default function FullStackDeveloperPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !phoneNumber) {
      toast.error("Please fill in name, email, and phone.");
      return;
    }
    try {
      setSubmitting(true);
      if (resumeFile) {
        const data = new FormData();
        data.append("full_name", fullName);
        data.append("email", email);
        data.append("phone_number", phoneNumber);
        data.append("cover_letter", coverLetter);
        data.append("position", "Full Stack Developer");
        data.append("resume", resumeFile);
        await axiosInstance({
          method: "POST",
          url: "/careers/applications",
          data,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance({
          method: "POST",
          url: "/careers/applications",
          data: {
            full_name: fullName,
            email,
            phone_number: phoneNumber,
            cover_letter: coverLetter,
            position: "Full Stack Developer",
          },
        });
      }
      toast.success("Application submitted successfully");
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCoverLetter("");
      setResumeFile(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
          Full Stack Developer
        </h1>
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <MapPin className="w-4 h-4" /> Ahmedabad, India • 1 open position
        </div>
        <p className="text-gray-700 mb-8">
          Build and maintain web applications, collaborate with cross-functional
          teams, and deliver high-quality features.
        </p>

        <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label className="flex items-center justify-between gap-3 border border-input rounded-md px-3 py-2 text-sm cursor-pointer">
              <span className="text-gray-600 truncate">
                {resumeFile ? resumeFile.name : "Upload resume (PDF/Doc)"}
              </span>
              <span className="inline-flex items-center gap-2 text-primary">
                <Upload className="w-4 h-4" /> Choose file
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <Textarea
            placeholder="Cover letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
