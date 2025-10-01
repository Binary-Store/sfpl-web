"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Smartphone,
  Loader2,
  Building2,
  AlarmCheck,
  LayoutDashboard,
  Wrench,
  Phone,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { useDeviceById } from "@/hooks/useDevices";
import { useGlobal } from "@/contexts/GlobalContext";
import { Badge } from "@/components/ui/badge";
import { updateAlternativeContacts } from "@/services/api/devices";

export default function DeviceDetails() {
  const params = useParams();
  const id = params.id as string;
  const { setBreadcrumbsEndPoint } = useGlobal();
  const router = useRouter();

  const { data: device, isLoading, refetch } = useDeviceById(id || "");

  // State for editing alternative contacts
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [editingContacts, setEditingContacts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

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

  // Initialize editing contacts when device data loads
  useEffect(() => {
    if (device?.alternative_contacts) {
      setEditingContacts([...device.alternative_contacts]);
    }
  }, [device?.alternative_contacts]);

  // Helper functions for managing alternative contacts
  const handleEditContacts = () => {
    setIsEditingContacts(true);
    setEditingContacts([...(device?.alternative_contacts || [])]);
  };

  const handleCancelEdit = () => {
    setIsEditingContacts(false);
    setEditingContacts([...(device?.alternative_contacts || [])]);
  };

  const handleAddContact = () => {
    setEditingContacts([
      ...editingContacts,
      { name: "", designation: "", phone_number: "" },
    ]);
  };

  const handleRemoveContact = (index: number) => {
    if (editingContacts.length > 1) {
      const newContacts = editingContacts.filter((_, i) => i !== index);
      setEditingContacts(newContacts);
    }
  };

  const handleContactChange = (index: number, field: string, value: string) => {
    const newContacts = [...editingContacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setEditingContacts(newContacts);
  };

  const handleSaveContacts = async () => {
    if (editingContacts.length < 3) {
      alert("Minimum 3 alternative contacts are required");
      return;
    }

    // Validate that all contacts have required fields
    const hasEmptyFields = editingContacts.some(
      (contact) =>
        !contact.name.trim() ||
        !contact.designation.trim() ||
        !contact.phone_number.trim()
    );

    if (hasEmptyFields) {
      alert("All contact fields are required");
      return;
    }

    setIsSaving(true);
    try {
      await updateAlternativeContacts(id, editingContacts);
      setIsEditingContacts(false);
      refetch(); // Refresh device data
    } catch (error) {
      console.error("Error updating alternative contacts:", error);
      alert("Failed to update alternative contacts. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <span>Alternative Contacts</span>
            </div>
            {!isEditingContacts ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditContacts}
                className="flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveContacts}
                  disabled={isSaving || editingContacts.length < 3}
                  className="flex items-center space-x-2"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{isSaving ? "Saving..." : "Save"}</span>
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-0">
          {isEditingContacts ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Minimum 3 contacts required. All fields are mandatory.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddContact}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Contact</span>
                </Button>
              </div>
              <div className="space-y-3">
                {editingContacts.map((contact: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Name
                      </label>
                      <Input
                        value={contact.name || ""}
                        onChange={(e) =>
                          handleContactChange(index, "name", e.target.value)
                        }
                        placeholder="Enter name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Designation
                      </label>
                      <Input
                        value={contact.designation || ""}
                        onChange={(e) =>
                          handleContactChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                        placeholder="Enter designation"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <Input
                          value={contact.phone_number || ""}
                          onChange={(e) =>
                            handleContactChange(
                              index,
                              "phone_number",
                              e.target.value
                            )
                          }
                          placeholder="Enter phone number"
                          className="mt-1 font-mono"
                        />
                      </div>
                      {editingContacts.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveContact(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {device?.alternative_contacts &&
              device.alternative_contacts.length > 0 ? (
                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="text-left font-medium px-3 py-2">#</th>
                        <th className="text-left font-medium px-3 py-2">
                          Name
                        </th>
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
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50"
                          >
                            <td className="px-3 py-2">{index + 1}</td>
                            <td className="px-3 py-2">
                              {contact?.name || "N/A"}
                            </td>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
