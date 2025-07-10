"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Award,
  ExternalLink,
  Search,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Shield,
} from "lucide-react";
import { getAllCertificates, validateSheetSetup } from "@/lib/google-sheets";
import type { Certificate } from "@/types/certificate";

export default function HomePage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetStatus, setSheetStatus] = useState<{
    isValid: boolean;
    error?: string;
    sampleData?: any[];
  } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Validate sheet setup
      const validation = await validateSheetSetup();
      console.log("Sheet status:", validation);
      setSheetStatus(validation);

      // Load certificates if validation passes
      if (validation.isValid) {
        const certs = await getAllCertificates();

        const sortedCerts = certs.sort((a, b) => {
          return Date.parse(b.completionDate) - Date.parse(a.completionDate);
        });
        setCertificates(sortedCerts);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setSheetStatus({
        isValid: false,
        error: "Failed to connect to Google Sheets",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleCertificates = filteredCertificates.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-12 w-12 text-[#5a45fe]" />
            <h1 className="text-4xl font-bold text-gray-900">
              Mailmodo Achievers
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Get your certificates & show off your skills
          </p>
          {/* <Badge variant="outline" className="text-sm">
            <FileSpreadsheet className="h-4 w-4 mr-1" />
            Real-time issuance of certificates
          </Badge> */}
        </div>
        {/* Search and Certificates */}
        {sheetStatus?.isValid && (
          <>
            {/* Search */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <Label htmlFor="search" className="sr-only">
                      Search certificates
                    </Label>
                    <Input
                      id="search"
                      placeholder="Search by name, course, or certificate ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleCertificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {cert.recipientName}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {cert.issuerName}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={cert.isVerified ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {cert.isVerified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {cert.courseName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Completed: {cert.completionDate}
                      </p>
                      {cert.grade && (
                        <p className="text-sm text-gray-600">
                          Grade: {cert.grade}
                        </p>
                      )}
                    </div>

                    {cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cert.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <Button asChild className="w-full">
                      <Link
                        href={`${cert.courseName
                          .trim()
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}/certificate/${cert.recipientName
                          .toLowerCase()
                          .replace(/\s+/g, "-")}-${cert.id}`}
                      >
                        {/* <Link
                        href={`/certificate/${cert.recipientName
                          .toLowerCase()
                          .replace(/\s+/g, "-")}-${cert.id}`}
                      > */}
                        {/* 
                      <Link href={`/certificate/${cert.id}`}> */}
                        View Certificate
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredCertificates.length > visibleCount && (
              <div className="text-center mt-6 mb-[6px]">
                <Button onClick={() => setVisibleCount((prev) => prev + 9)}>
                  Show More
                </Button>
              </div>
            )}

            {filteredCertificates.length === 0 && !loading && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No certificates found
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "No certificates available in the Google Sheet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Google Sheets Status */}
      </div>
    </div>
  );
}
