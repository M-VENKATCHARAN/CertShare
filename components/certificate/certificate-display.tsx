import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Certificate } from "@/types/certificate";

interface CertificateDisplayProps {
  certificate: Certificate;
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <Card className="overflow-hidden" data-certificate-display>
      <div className="flex justify-center items-center">
        <Image
          src={certificate.certificateUrl}
          alt={`${certificate.courseName} Certificate for ${certificate.recipientName}`}
          height={100}
          width={620}
          className="w-full h-auto"
        />
      </div>
    </Card>
  );
}
