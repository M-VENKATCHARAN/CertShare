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

// Dynamic imports for client-side libraries
const html2pdf = typeof window !== "undefined" ? require("html2pdf.js") : null;
const html2canvas =
  typeof window !== "undefined" ? require("html2canvas") : null;

interface ShareOptionsProps {
  certificate: Certificate;
}

export function ShareOptions({ certificate }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
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
    setDownloading(true);

    try {
      const filename = `${certificate.recipientName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${certificate.spaceSlug}-certificate`;

      // Find the certificate display element
      const certificateElement: HTMLElement | null =
        document.querySelector("[data-certificate-display]") ||
        document.querySelector(".certificate-display") ||
        document.querySelector('[data-testid="certificate-display"]');

      if (!certificateElement) {
        console.error("Certificate display element not found");
        return;
      }

      if (format === "pdf") {
        if (!html2pdf) {
          console.error("html2pdf is not available");
          return;
        }

        const elementWidth = certificateElement.scrollWidth;
        const elementHeight = certificateElement.scrollHeight;

        // Calculate optimal PDF dimensions (in mm)
        const aspectRatio = elementWidth / elementHeight;
        let pdfWidth, pdfHeight, orientation;

        if (aspectRatio > 1) {
          // Landscape orientation
          orientation = "landscape";
          pdfWidth = Math.max(210, elementWidth * 0.264583); // Convert px to mm
          pdfHeight = pdfWidth / aspectRatio;
        } else {
          // Portrait orientation
          orientation = "portrait";
          pdfHeight = Math.max(297, elementHeight * 0.264583);
          pdfWidth = pdfHeight * aspectRatio;
        }

        const options = {
          margin: 0,
          filename: `${filename}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 1.5,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            width: elementWidth,
            height: elementHeight,
          },
          jsPDF: {
            unit: "mm",
            format: [pdfWidth, pdfHeight],
            orientation: orientation,
            compress: true,
          },
          pagebreak: { mode: ["avoid-all"] },
        };

        await html2pdf().set(options).from(certificateElement).save();
      } else if (format === "png") {
        if (!html2canvas) {
          console.error("html2canvas is not available");
          return;
        }

        const canvas = await html2canvas(certificateElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        // Convert canvas to PNG and download
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch (error) {
      console.error(`Failed to download ${format.toUpperCase()}:`, error);
    } finally {
      setDownloading(false);
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
              disabled={downloading}
            >
              <Download className="h-4 w-4" />
              {downloading ? "Downloading..." : "Download PDF"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleDownload("png")}
              disabled={downloading}
            >
              <Download className="h-4 w-4" />
              {downloading ? "Downloading..." : "Download PNG"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 p-2 bg-gray-50 rounded border text-xs text-gray-600 overflow-x-auto">
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
