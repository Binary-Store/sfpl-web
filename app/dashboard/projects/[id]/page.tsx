"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Loader2,
  Building2,
  AlarmCheck,
  LayoutDashboard,
  Wrench,
  Phone,
} from "lucide-react";
import { useDeviceById } from "@/hooks/useDevices";
import { useGlobal } from "@/contexts/GlobalContext";
import { Badge } from "@/components/ui/badge";

export default function DeviceDetails() {
  const params = useParams();
  const id = params.id as string;
  const { setBreadcrumbsEndPoint } = useGlobal();
  const router = useRouter();

  const { data: device, isLoading } = useDeviceById(id || "");

  useEffect(() => {
    if (device && id) {
      setBreadcrumbsEndPoint([
        {
          id: device.id,
          label:
            device.name.slice(0, 1).toUpperCase() + device.name.slice(1) || "",
          href: "/dashboard/projects/" + id,
        },
      ]);
    }
  }, [id, device, setBreadcrumbsEndPoint]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading device details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-4">
      {/* Header with Actions */}
      <div className="flex items-center justify-start">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/projects/${id}/alarm-panel`)}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            System Dashboard
          </Button>
        </div>
      </div>

      {/* Device Information Grid */}
      <Card className="h-fit !gap-1 p-4">
        <CardHeader className="pb-0 px-0">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Smartphone className="h-5 w-5 text-blue-600" />
            <span>
              Basic Information
              <Badge variant="outline" className="ml-2">
                {device?.serial || "Unnamed Device"}
              </Badge>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Device Name
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.name || "Unnamed Device"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                IMEI
              </label>
              <p className="text-sm font-mono text-gray-900 rounded">
                {device?.imei || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Sim Card Number
              </label>
              <p className="text-sm font-mono text-gray-900 rounded">
                {device?.sim_card?.number || "N/A"}
              </p>
            </div>

            <div className="space-y-1 ">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Description
              </label>
              <p className="text-sm text-gray-900">
                {device?.description || "No description provided"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Customer
              </label>
              <p className="text-sm text-gray-900">
                {device?.customer_name || "No customer assigned"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alarm Information */}
      <Card className="h-fit !gap-1 p-4">
        <CardHeader className="pb-0 px-0">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <AlarmCheck className="h-5 w-5 text-green-600" />
            <span>Alarm Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Brand
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.brand || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Model Number
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.model_number || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                System Type
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.system_type || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pump Information */}
      <Card className="h-fit !gap-1 p-4">
        <CardHeader className="pb-0 px-0">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Wrench className="h-5 w-5 text-orange-600" />
            <span>Pump Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {device?.pumps && device.pumps.length > 0 ? (
            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-medium px-3 py-2">#</th>
                    <th className="text-left font-medium px-3 py-2">Type</th>
                    <th className="text-left font-medium px-3 py-2">Brand</th>
                    <th className="text-left font-medium px-3 py-2">
                      Horsepower (HP)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {device.pumps.map((pump: any, index: number) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2 uppercase">
                        {pump?.type || "N/A"}
                      </td>
                      <td className="px-3 py-2">{pump?.brand || "N/A"}</td>
                      <td className="px-3 py-2">{pump?.horsepower ?? "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-gray-900">
              No pump information available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Building Information */}
      <Card className="h-fit !gap-1 p-4">
        <CardHeader className="pb-0 px-0">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building2 className="h-5 w-5 text-green-600" />
            <span>Building Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Number of Floors
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.number_of_floors || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Number of Blocks
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.number_of_blocks || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Latitude
              </label>
              <p className="text-sm font-mono text-gray-900">
                {device?.latitude || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Longitude
              </label>
              <p className="text-sm font-mono text-gray-900">
                {device?.longitude || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Ward
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.ward_name || "No Ward Assigned"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Occupancy Type
              </label>
              <p className="text-sm font-medium text-gray-900">
                {device?.occupancy_type || "N/A"}
              </p>
            </div>
            <div className="space-y-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Address
              </label>
              <p className="text-sm text-gray-900">
                {device?.address || "No address provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Contacts */}
      <Card className="h-fit !gap-1 p-4">
        <CardHeader className="pb-0 px-0">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Phone className="h-5 w-5 text-blue-600" />
            <span>Alternative Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {device?.alternative_contacts &&
          device.alternative_contacts.length > 0 ? (
            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-medium px-3 py-2">#</th>
                    <th className="text-left font-medium px-3 py-2">Name</th>
                    <th className="text-left font-medium px-3 py-2">
                      Designation
                    </th>
                    <th className="text-left font-medium px-3 py-2">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {device.alternative_contacts.map(
                    (contact: any, index: number) => (
                      <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{contact?.name || "N/A"}</td>
                        <td className="px-3 py-2">
                          {contact?.designation || "N/A"}
                        </td>
                        <td className="px-3 py-2 font-mono">
                          {contact?.phone_number || "N/A"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-gray-900">
              No alternative contacts available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}