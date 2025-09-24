"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";

export default function CareersPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Careers
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join Specific Fire Protection Limited and help us build safer
            spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/careers/full-stack-developer" className="group">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-xl">Full Stack Developer</CardTitle>
                <CardDescription>1 open position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" /> Ahmedabad, India
                </div>
                <p className="text-gray-700">
                  Build and maintain web applications, collaborate with
                  cross-functional teams, and deliver high-quality features.
                </p>
                <div className="mt-4 text-primary inline-flex items-center gap-2">
                  View details{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/careers/call-attender" className="group">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-xl">Call Attender</CardTitle>
                <CardDescription>1 open position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" /> Ahmedabad, India
                </div>
                <p className="text-gray-700">
                  Handle inbound and outbound calls, provide excellent customer
                  support, and maintain call logs.
                </p>
                <div className="mt-4 text-primary inline-flex items-center gap-2">
                  View details{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
