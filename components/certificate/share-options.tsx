"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Share2,
  Download,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Link2,
} from "lucide-react";
import type { Certificate } from "@/types/certificate";
import { usePathname } from "next/navigation";

interface ShareOptionsProps {
  certificate: Certificate;
}

export function ShareOptions({ certificate }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const generateUrl = () => {
    return `https://courses.mailmodo.com${pathname}`;
  };

  const handleShare = (platform: string) => {
    const url = generateUrl();
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
    try {
      const url = generateUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = async (format: "pdf" | "png") => {
    const url = certificate.certificateUrl;
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${certificate.recipientName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${certificate.spaceSlug}-certificate.${format}`;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(`Failed to download ${format.toUpperCase()}:`, error);
    }
  };

  return (
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
            className="flex items-center justify-center"
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleShare("twitter")}
            className="flex items-center justify-center"
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleShare("facebook")}
            className="flex items-center justify-center"
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleShare("email")}
            className="flex items-center justify-center"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleDownload("pdf")}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleDownload("png")}
            >
              <Download className="h-4 w-4" />
              Download PNG
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 p-2 bg-gray-50 rounded border text-sm text-gray-600 overflow-x-auto">
            {generateUrl()}
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
  );
}
