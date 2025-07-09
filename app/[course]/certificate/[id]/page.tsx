"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Share2,
  Download,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Link2,
  Shield,
  Calendar,
  User,
  Award,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { getCertificateById } from "@/lib/google-sheets";
import type { Certificate } from "@/types/certificate";

interface CertificatePageProps {
  params: {
    id: string;
  };
}

export default function CertificatePage({ params }: CertificatePageProps) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadCertificate = async () => {
    try {
      setError(null);
      // const cert = await getCertificateById(params.id);
      const certificateId = params.id.split("-").pop(); // get the last part
      const cert = await getCertificateById(certificateId || "");

      if (cert) {
        setCertificate(cert);
      } else {
        setError("Certificate not found in Google Sheets");
      }
    } catch (err) {
      setError("Failed to load certificate from Google Sheets");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCertificate();
  }, [params.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCertificate();
  };

  const handleShare = (platform: string) => {
    if (!certificate) return;

    const url = `${window.location.origin}/${certificate.courseName
      .toLowerCase()
      .replace(/\s+/g, "-")}/certificate/${certificate.recipientName
      .toLowerCase()
      .replace(/\s+/g, "-")}-${certificate.id}`;

    const text = `I just completed ${certificate.courseName} at ${certificate.issuerName}! 🎓`;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            `Check out my certificate: ${certificate.courseName}`
          )}&body=${encodeURIComponent(`${text}\n\nView certificate: ${url}`)}`
        );
        break;
    }
  };

  const copyToClipboard = async () => {
    if (!certificate) return;

    try {
      const url = `${window.location.origin}/${certificate.courseName
        .toLowerCase()
        .replace(/\s+/g, "-")}/certificate/${certificate.recipientName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${certificate.id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Loading certificate from Google Sheets...
          </p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Certificate Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              {error ||
                "The certificate you're looking for doesn't exist in our Google Sheets database."}
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full"
              >
                {refreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh from Sheets
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="w-full bg-transparent"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const handleDownloadPDF = async () => {
    const pdfUrl = certificate?.certificateUrl;
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "certificate.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  const handleDownloadPNG = async () => {
    const imageUrl = certificate?.certificateUrl;
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "certificate.png";
      link.click();
      URL.revokeObjectURL(url); // clean up
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CertShare</span>
              <Badge variant="outline" className="ml-2 text-xs">
                Powered by Google Sheets
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-transparent"
              >
                {refreshing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                {certificate.isVerified ? "Verified" : "Pending"}
              </Badge>
            </div>
          </div>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Display */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              {/* <div
                className="p-8 text-white bg-contain bg-center bg-no-repeat  sm:h-[440px]" // className="p-8 text-white bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${certificate.templateurl}')`,
                }}
                // className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
              >
                <div className="text-center space-y-4">
                  <p className="text-xl opacity-90 text-black">
                    This certifies that
                  </p> */}
              {/* <h2 className="text-xl font-bold text-black ml-[20px] mt-[140px]">
                    {certificate.recipientName}
                  </h2> */}
              {/* <h2 className="sm:text-xl   font-bold text-black ml-[40px] mt-[150px] sm:ml-[20px] sm:mt-[140px]">
                    {certificate.recipientName}
                  </h2>
                </div>
              </div> */}
              <div
                className="flex justify-center items-center"
                // className="h-[260px] sm:h-[440px] bg-contain bg-center bg-no-repeat relative flex items-start justify-start sm:items-start sm:justify-start"
                // style={{
                //   backgroundImage: `url('${certificate.certificateUrl}')`,
                // }}
              >
                {/* <div className="ml-[135px] mt-[100px] sm:ml-[335px] sm:mt-[175px]">
                  <h2 className="text-sm sm:text-xl font-bold text-black">
                    {certificate.recipientName}
                  </h2>
                </div> */}
                <Image
                  src={certificate.certificateUrl}
                  alt="Certificate"
                  height={100}
                  width={620}
                />
              </div>
            </Card>
            {/* <div className=" h-[160px] sm:h-[440px]">
              <img
                src={certificate.templateurl}
                className=" top-1 h-[250px] ml:[50px] mb-[10px] sm:h-[440px] w-[80%] sm:mt-[25px] sm:ml-[80px]"
                alt="Certificate Template"
              />
              <div className=" z-20 ml-[135px] mt-[100px] sm:ml-[335px] sm:mt-[50px]">
                <h2 className="text-sm sm:text-xl font-bold text-black">
                  {certificate.recipientName}
                </h2>
              </div>
            </div> */}

            {/* Sharing Options */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share this certificate
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-10 gap-1 mb-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    {/* <span>LinkedIn</span> */}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("twitter")}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Twitter className="h-4 w-4" />
                    {/* <span>Twitter</span> */}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("facebook")}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Facebook className="h-4 w-4" />
                    {/* <span>Facebook</span> */}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleShare("email")}
                    className="flex items-center justify-center space-x"
                  >
                    <Mail className="h-4 w-4" />
                    {/* <span>Email</span> */}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleDownloadPNG}
                    >
                      <Download className="h-4 w-4" />
                      Download PNG
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 p-2 bg-gray-50 rounded border text-sm text-gray-600 overflow-x-auto">
                    {`${window.location.origin}/${certificate.courseName
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-"
                      )}/certificate/${certificate.recipientName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${certificate.id}`}
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    className="flex items-center justify-center space-x-1 bg-transparent w-full sm:w-auto"
                  >
                    <Link2 className="h-4 w-4" />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Details Sidebar */}
          <div className="space-y-6">
            {/* Certificate Info */}
            <Card>
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold mb-5 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Certificate Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Recipient
                      </p>
                      <p className="text-sm text-gray-600">
                        {certificate.recipientName}
                      </p>
                      {/* {certificate.recipientEmail && (
                        <p className="text-xs text-gray-500">
                          {certificate.recipientEmail}
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Completion Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {certificate.completionDate}
                      </p>
                    </div>
                  </div>

                  {/* <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Verification
                  </h3> */}
                  <div className="flex items-center space-x-2 pt-[5px]">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Verified by Mailmodo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Skills Acquired */}
            {certificate.skills.length > 0 && (
              <Card>
                <CardContent className="p-6 pt-5 ">
                  <h3 className="text-lg font-semibold mb-6">
                    Skills Acquired
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {certificate.courseName.toLowerCase().includes("email") && (
              <Card>
                <CardContent className="p-6 pt-4">
                  <h3 className="text-lg font-bold mb-4 text">
                    {/* Loved learning {certificate.courseName}? */}
                    Level Up Your Email Game
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {/* Explore our advanced courses on email infrastructure setup,
                    email deliverbaility fundamentals. */}
                    Completed this? Master deliverability next.
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        "https://mailmodo.com/courses/email-deliverability-course/")
                    }
                    className="bg-[#5a45fe] text-white"
                  >
                    {/* Explore Deliverability deep dive Course */}
                    Dive In
                  </Button>
                </CardContent>
              </Card>
            )}
            {certificate.courseName
              .toLowerCase()
              .includes("deliverability") && (
              <Card>
                <CardContent className="p-6 pt-3 mt-[1px]">
                  <h3 className="text-lg font-bold mb-4 ">
                    {/* Loved learning {certificate.courseName}? */}
                    Go Beyond Deliverability
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {/* Explore our advanced courses on email copywriting,email
                    design,segmentation strategies,email deliverability */}
                    Master copy, design, and strategy too.
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        "https://mailmodo.com/courses/email-marketing-certification/")
                    }
                    className="bg-[#5a45fe] text-white"
                  >
                    {/* Explore Email Masterclass Course */}
                    Join our Masterclass
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
